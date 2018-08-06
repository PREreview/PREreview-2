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
    WBPerson: String
  }

  input AuthorInput {
    email: String
    name: String
    submittingAuthor: Boolean
    WBPerson: String
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
    antibodyUsed: String
    backboneVector: String
    coinjected: String
    constructComments: String
    constructionDetails: String
    detectionMethod: String
    dnaSequence: [DNASequence]
    expressionPattern: String
    fusionType: String
    genotype: String
    injectionConcentration: String
    inSituDetails: String
    integratedBy: String
    observeExpression: ObserveExpression
    reporter: String
    species: String
    strain: String
    transgeneName: String
    transgeneUsed: [TransgeneUsed]
    utr: String
    variation: String
  }

  input GeneExpressionInput {
    antibodyUsed: String
    backboneVector: String
    coinjected: String
    constructComments: String
    constructionDetails: String
    detectionMethod: String
    dnaSequence: [DNASequenceInput]
    expressionPattern: String
    fusionType: String
    genotype: String
    injectionConcentration: String
    inSituDetails: String
    integratedBy: String
    observeExpression: ObserveExpressionInput
    reporter: String
    species: String
    strain: String
    transgeneName: String
    transgeneUsed: [TransgeneUsedInput]
    utr: String
    variation: String
  }

  type TransgeneUsed {
    id: ID
    name: String
  }

  input TransgeneUsedInput {
    id: ID
    name: String
  }

  type DNASequence {
    id: ID
    name: String
  }

  input DNASequenceInput {
    id: ID
    name: String
  }

  type ObserveExpression {
    certainly: [ObserveExpressionCertainlyEntry]
    not: [ObserveExpressionNotEntry]
    partially: [ObserveExpressionPartiallyEntry]
    possibly: [ObserveExpressionPossiblyEntry]
  }

  type ObserveExpressionCertainlyEntry {
    certainly: ObserveExpressionField
    during: ObserveExpressionField
    id: ID
    subcellularLocalization: ObserveExpressionField
  }

  type ObserveExpressionPartiallyEntry {
    partially: ObserveExpressionField
    during: ObserveExpressionField
    id: ID
    subcellularLocalization: ObserveExpressionField
  }

  type ObserveExpressionPossiblyEntry {
    possibly: ObserveExpressionField
    during: ObserveExpressionField
    id: ID
    subcellularLocalization: ObserveExpressionField
  }

  type ObserveExpressionNotEntry {
    not: ObserveExpressionField
    during: ObserveExpressionField
    id: ID
    subcellularLocalization: ObserveExpressionField
  }

  type ObserveExpressionField {
    id: ID
    value: String
  }

  input ObserveExpressionInput {
    certainly: [ObserveExpressionCertainlyEntryInput]
    not: [ObserveExpressionNotEntryInput]
    partially: [ObserveExpressionPartiallyEntryInput]
    possibly: [ObserveExpressionPossiblyEntryInput]
  }

  input ObserveExpressionCertainlyEntryInput {
    certainly: ObserveExpressionFieldInput
    during: ObserveExpressionFieldInput
    id: ID
    subcellularLocalization: ObserveExpressionFieldInput
  }

  input ObserveExpressionPartiallyEntryInput {
    during: ObserveExpressionFieldInput
    id: ID
    partially: ObserveExpressionFieldInput
    subcellularLocalization: ObserveExpressionFieldInput
  }

  input ObserveExpressionPossiblyEntryInput {
    during: ObserveExpressionFieldInput
    id: ID
    possibly: ObserveExpressionFieldInput
    subcellularLocalization: ObserveExpressionFieldInput
  }

  input ObserveExpressionNotEntryInput {
    during: ObserveExpressionFieldInput
    id: ID
    not: ObserveExpressionFieldInput
    subcellularLocalization: ObserveExpressionFieldInput
  }

  input ObserveExpressionFieldInput {
    id: ID
    value: String
  }
`

module.exports = typeDefs
