const typeDefs = `
  extend type Query {
    manuscript(id: ID!): Manuscript!
    manuscripts: [Manuscript]!
  }

  extend type Mutation {
    createSubmission: Manuscript!
    deleteManuscript(id: ID!): ID!
    updateManuscript(data: ManuscriptInput!): Manuscript!
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
    status: Status
  }

  input ManuscriptInput {
    id: ID!
    authors: [AuthorInput]
    title: String
    laboratory: String
    funding: String
    image: FileInput
    patternDescription: String
    acknowledgements: String
    suggestedReviewer: String
    disclaimer: Boolean
    comments: String
    status: StatusInput
  }

  type Status {
    dataTypeSelected: Boolean
    initialSubmission: Boolean
    submitted: Boolean
  }

  input StatusInput {
    dataTypeSelected: Boolean
    initialSubmission: Boolean
    submitted: Boolean
  }

  type Author {
    email: String
    name: String
    submittingAuthor: Boolean
    wormBaseId: String
  }

  input AuthorInput {
    email: String
    name: String
    submittingAuthor: Boolean
    wormBaseId: String
  }

  type File {
    name: String
    url: String
    size: String
    type: String
  }

  input FileInput {
    name: String
    url: String
    size: String
    type: String
  }
`

module.exports = typeDefs
