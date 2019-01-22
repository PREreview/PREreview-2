const union = require('lodash/union')

const ExternalTeam = require('../../models/externalTeam/externalTeam')
const ExternalUser = require('../../models/externalUser/externalUser')

const addExternalReviewer = async (_, variables, ctx) => {
  const { articleId, email, name } = variables.input

  const externalUsers = await ctx.connectors.ExternalUser.fetchAll(ctx)
  const currentExternalUser = externalUsers.find(u => u.email === email)
  let externalUser

  // TO DO -- Give feedback that user already exists
  if (currentExternalUser) {
    externalUser = currentExternalUser
  } else {
    externalUser = await ExternalUser.query().insert({ email, name })
  }

  const team = await ExternalTeam.query().findOne({
    manuscriptId: articleId,
    teamType: 'externalReviewers',
  })

  let updated

  if (team) {
    updated = await ExternalTeam.query().patchAndFetchById(team.id, {
      members: union(team.members, [externalUser.id]),
    })
  } else {
    updated = await ExternalTeam.query().insert({
      manuscriptId: articleId,
      members: [externalUser.id],
      teamType: 'externalReviewers',
    })
  }

  return updated.id
}

module.exports = addExternalReviewer
