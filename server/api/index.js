const fs = require('fs')
const path = require('path')
const resolvers = require('./resolvers')

// Read the graphql files and output them as a string
const loadGQLFiles = paths =>
  paths
    .map(p => {
      const fullPath = path.join(__dirname, p)
      return fs.readFileSync(fullPath, 'utf-8')
    })
    .join('')

const typeDefinitionPaths = [
  './addExternalReviewer/addExternalReviewer.graphql',
  './teamsForArticle/teamsForArticle.graphql',
  './externalTeam/externalTeam.graphql',
  './externalUser/externalUser.graphql',
]
const typeDefs = loadGQLFiles(typeDefinitionPaths)

module.exports = {
  resolvers,
  typeDefs,
}
