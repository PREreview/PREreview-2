/* eslint-disable sort-keys */

const addExternalReviewer = require('./addExternalReviewer/addExternalReviewer.resolver')
const teamsForArticle = require('./teamsForArticle/teamsForArticle.resolver')
const {
  ExternalTeam,
  getExternalTeamsForManuscript,
} = require('./externalTeam/externalTeam.resolver')

const resolvers = {
  Query: {
    getExternalTeamsForManuscript,
    teamsForArticle,
  },
  Mutation: {
    addExternalReviewer,
  },
  ExternalTeam,
}

module.exports = resolvers
