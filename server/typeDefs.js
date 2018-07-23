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
    acknowledgements: String
    authors: [Author]
    comments: String
    dataType: String
    disclaimer: Boolean
    funding: String
    geneExpression: GeneExpression
    id: ID!
    image: File
    laboratory: String
    patternDescription: String
    status: Status
    suggestedReviewer: String
    title: String
  }

  input ManuscriptInput {
    acknowledgements: String
    authors: [AuthorInput]
    comments: String
    dataType: String
    disclaimer: Boolean
    funding: String
    geneExpression: GeneExpressionInput
    id: ID!
    image: FileInput
    laboratory: String
    patternDescription: String
    status: StatusInput
    suggestedReviewer: String
    title: String
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

  type GeneExpression {
    detectionMethod: String
  }

  input GeneExpressionInput {
    detectionMethod: String
  }
`

module.exports = typeDefs
