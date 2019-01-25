const union = require('lodash/union')

const { User } = require('pubsweet-server')

const { model: ExternalTeam } = require('../../models/externalTeam')
const { model: ExternalUser } = require('../../models/externalUser')
const notify = require('../../services/notify')

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
  // console.log('user', user)

  /* 
    find corresponding external user
    see if external user's id exists in any external teams
    for each external team, find the corresponding normal team
    add user id to normal teams
    remove external user
  */

  const externalUser = await ExternalUser.query().findOne({ email: user.email })

  if (externalUser) {
    // external team where id in array
    // how to do this in sql?
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
