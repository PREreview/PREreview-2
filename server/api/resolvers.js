/* eslint-disable sort-keys */

const addExternalReviewer = require('./addExternalReviewer/addExternalReviewer.resolver')
const teamsForArticle = require('./teamsForArticle/teamsForArticle.resolver')
const {
  ExternalTeam,
  getExternalTeamsForManuscript,
  inviteExternalReviewer,
  normalizeTeamMembership,
} = require('./externalTeam/externalTeam.resolver')

const resolvers = {
  Query: {
    getExternalTeamsForManuscript,
    teamsForArticle,
  },
  Mutation: {
    addExternalReviewer,
    inviteExternalReviewer,
    normalizeTeamMembership,
  },
  ExternalTeam,
}

module.exports = resolvers
