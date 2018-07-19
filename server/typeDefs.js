const typeDefs = `
  extend type Query {
    manuscript(id: ID!): Manuscript!
    manuscripts: [Manuscript]!
  }

  extend type Mutation {
    createSubmission: Manuscript!
    updateManuscript: Manuscript!
  }

  type Manuscript {
    id: ID!
    authors: [Author]
    title: String
    laboratory: String
    funding: String
    image: File
    patternDescription: String
    acknowledgements: String
    suggestedReviewer: String
    disclaimer: Boolean
    comments: String
  }

  type Author {
    email: String
    name: String
    wormBaseId: String
  }

  type File {
    name: String
    url: String
    size: String
    type: String
  }
`

module.exports = typeDefs
