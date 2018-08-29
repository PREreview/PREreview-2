const typeDefs = `
  extend type Query {
    globalTeams: [Team]
    manuscript(id: ID!): Manuscript!
    manuscripts: [Manuscript]!
    teamsForArticle(id: ID!): [Team]
  }

  extend type Mutation {
    createSubmission: Manuscript!
    deleteManuscript(id: ID!): ID!
    updateManuscript(data: ManuscriptInput!): Manuscript!
  }

  type HistoryEntry {
    content: String
    id: ID!
    timestamp: String
    user: User
  }

  input HistoryEntryInput {
    content: String
    timestamp: String
    user: ID!
  }

  type Manuscript {
    acknowledgements: String
    authors: [Author]
    comments: String
    communicationHistory: [HistoryEntry]
    dataType: String
    decisionLetter: String
    disclaimer: Boolean
    funding: String
    geneExpression: GeneExpression
    id: ID!
    image: File
    laboratory: WBItem
    patternDescription: String
    status: Status
    suggestedReviewer: String
    title: String
  }

  input ManuscriptInput {
    acknowledgements: String
    authors: [AuthorInput]
    comments: String
    communicationHistory: [HistoryEntryInput]
    dataType: String
    decisionLetter: String
    disclaimer: Boolean
    funding: String
    geneExpression: GeneExpressionInput
    id: ID!
    image: FileInput
    laboratory: WBItemInput
    patternDescription: String
    status: StatusInput
    suggestedReviewer: String
    title: String
  }

  type Status {
    dataTypeSelected: Boolean
    decision: DecisionStatus
    initialSubmission: Boolean
    submitted: Boolean
  }

  input StatusInput {
    dataTypeSelected: Boolean
    decision: DecisionStatusInput
    initialSubmission: Boolean
    submitted: Boolean
  }

  type DecisionStatus {
    accepted: Boolean
    rejected: Boolean
    revise: Boolean
  }

  input DecisionStatusInput {
    accepted: Boolean
    rejected: Boolean
    revise: Boolean
  }

  type Author {
    credit: String
    email: String
    id: ID
    name: String
    submittingAuthor: Boolean
    WBId: String
  }

  input AuthorInput {
    credit: String
    email: String
    id: ID
    name: String
    submittingAuthor: Boolean
    WBId: String
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
    backboneVector: WBItem
    coinjected: String
    constructComments: String
    constructionDetails: String
    detectionMethod: String
    dnaSequence: [WBItem]
    expressionPattern: WBItem
    fusionType: WBItem
    genotype: String
    injectionConcentration: String
    inSituDetails: String
    integratedBy: WBItem
    observeExpression: ObserveExpression
    reporter: WBItem
    species: WBItem
    strain: String
    transgeneName: String
    transgeneUsed: [WBItem]
    utr: WBItem
    variation: WBItem
  }

  input GeneExpressionInput {
    antibodyUsed: String
    backboneVector: WBItemInput
    coinjected: String
    constructComments: String
    constructionDetails: String
    detectionMethod: String
    dnaSequence: [WBItemInput]
    expressionPattern: WBItemInput
    fusionType: WBItemInput
    genotype: String
    injectionConcentration: String
    inSituDetails: String
    integratedBy: WBItemInput
    observeExpression: ObserveExpressionInput
    reporter: WBItemInput
    species: WBItemInput
    strain: String
    transgeneName: String
    transgeneUsed: [WBItemInput]
    utr: WBItemInput
    variation: WBItemInput
  }

  type WBItem {
    name: String
    type: String
    WBId: String
  }

  input WBItemInput {
    name: String
    type: String
    WBId: String
  }

  type ObserveExpression {
    certainly: [ObserveExpressionCertainlyEntry]
    not: [ObserveExpressionNotEntry]
    partially: [ObserveExpressionPartiallyEntry]
    possibly: [ObserveExpressionPossiblyEntry]
  }

  type ObserveExpressionCertainlyEntry {
    certainly: WBItem
    during: WBItem
    id: ID
    subcellularLocalization: WBItem
  }

  type ObserveExpressionPartiallyEntry {
    partially: WBItem
    during: WBItem
    id: ID
    subcellularLocalization: WBItem
  }

  type ObserveExpressionPossiblyEntry {
    possibly: WBItem
    during: WBItem
    id: ID
    subcellularLocalization: WBItem
  }

  type ObserveExpressionNotEntry {
    not: WBItem
    during: WBItem
    id: ID
    subcellularLocalization: WBItem
  }

  input ObserveExpressionInput {
    certainly: [ObserveExpressionCertainlyEntryInput]
    not: [ObserveExpressionNotEntryInput]
    partially: [ObserveExpressionPartiallyEntryInput]
    possibly: [ObserveExpressionPossiblyEntryInput]
  }

  input ObserveExpressionCertainlyEntryInput {
    certainly: WBItemInput
    during: WBItemInput
    id: ID
    subcellularLocalization: WBItemInput
  }

  input ObserveExpressionPartiallyEntryInput {
    during: WBItemInput
    id: ID
    partially: WBItemInput
    subcellularLocalization: WBItemInput
  }

  input ObserveExpressionPossiblyEntryInput {
    during: WBItemInput
    id: ID
    possibly: WBItemInput
    subcellularLocalization: WBItemInput
  }

  input ObserveExpressionNotEntryInput {
    during: WBItemInput
    id: ID
    not: WBItemInput
    subcellularLocalization: WBItemInput
  }

  extend type Team {
    global: Boolean
  }

  extend input TeamInput {
    global: Boolean
  }
`

module.exports = typeDefs
