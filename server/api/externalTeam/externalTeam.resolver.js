const union = require('lodash/union')
const without = require('lodash/without')

const { Team, User } = require('pubsweet-server')

const { model: ExternalTeam } = require('../../models/externalTeam')
const { model: ExternalUser } = require('../../models/externalUser')
const notify = require('../../services/notify')

const externalTeamMapper = {
  externalReviewers: 'reviewers',
  externalReviewersInvited: 'reviewersInvited',
}

const getExternalTeamsForManuscript = async (_, { manuscriptId }, ctx) =>
  ExternalTeam.query().where({ manuscriptId })

const inviteExternalReviewer = async (_, { manuscriptId, reviewerId }, ctx) => {
  let externalInvitedReviewersTeam

  externalInvitedReviewersTeam = await ExternalTeam.query().findOne({
    manuscriptId,
    teamType: 'externalReviewersInvited',
  })

  if (!externalInvitedReviewersTeam) {
    externalInvitedReviewersTeam = await ExternalTeam.query().insert({
      manuscriptId,
      members: [],
      teamType: 'externalReviewersInvited',
    })
  }

  await ctx.connectors.ExternalTeam.update(
    externalInvitedReviewersTeam.id,
    {
      members: union(externalInvitedReviewersTeam.members, [reviewerId]),
    },
    ctx,
  )

  notify('sendExternalReviewerInvitation', {
    externalUserId: reviewerId,
    object: { id: manuscriptId },
  })

  return externalInvitedReviewersTeam.id
}

// Checks if user is part of an external team & moves them to a normal team
const normalizeTeamMembership = async (_, variables, ctx) => {
  // console.log('Normalize team membership')

  const { userId } = variables
  const user = await User.find(userId)

  const externalUser = await ExternalUser.query().findOne({ email: user.email })

  if (externalUser) {
    const externalTeamsForUser = await ExternalTeam.query().whereJsonSupersetOf(
      'members',
      [externalUser.id],
    )

    const teams = await Team.all()

    const normalizeOneTeamMemership = async externalTeam => {
      const team = teams.find(
        t =>
          !t.global &&
          t.object.objectId === externalTeam.manuscriptId &&
          t.teamType === externalTeamMapper[externalTeam.teamType],
      )

      if (!team) throw new Error('Corresponding team not found!')

      return Promise.all([
        ctx.connectors.Team.update(
          team.id,
          { members: union(team.members, [user.id]) },
          ctx,
        ),
        ExternalTeam.query()
          .patch({
            members: without(externalTeam.members, externalUser.id),
          })
          .where({
            id: externalTeam.id,
          }),
      ])
    }

    const normalizeManyTeamMemberships = async externalTeams =>
      Promise.all(externalTeams.map(t => normalizeOneTeamMemership(t)))

    await normalizeManyTeamMemberships(externalTeamsForUser)
    await ExternalUser.query().deleteById(externalUser.id)
  }

  return user.id
}

module.exports = {
  ExternalTeam: {
    members(team, vars, ctx) {
      return ctx.connectors.ExternalUser.fetchSome(team.members, ctx)
    },
  },
  getExternalTeamsForManuscript,
  inviteExternalReviewer,
  normalizeTeamMembership,
}
