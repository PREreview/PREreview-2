const union = require('lodash/union')

const { model: ExternalTeam } = require('../../models/externalTeam')
// const { model: ExternalUser } = require('../../models/externalUser')
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

module.exports = {
  ExternalTeam: {
    members(team, vars, ctx) {
      return ctx.connectors.ExternalUser.fetchSome(team.members, ctx)
    },
  },
  getExternalTeamsForManuscript,
  inviteExternalReviewer,
}
