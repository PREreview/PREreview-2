const addExternalReviewer = require('./addExternalReviewer/addExternalReviewer.resolver')

const resolvers = {
  Mutation: {
    addExternalReviewer,
  },
}

module.exports = resolvers
