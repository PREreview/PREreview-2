const typeDefs = `
  extend type Query {
    userReviewsForArticle(articleVersionId: ID!, reviewerId: ID!): [Review],
  }

  extend type Mutation {
    createReview(input: CreateReviewInput!): ID!
    updateReview(id: ID!, input: UpdateReviewInput!): ID!
  }

  scalar Date

  type Review {
    articleVersionId: ID
    content: String
    events: ReviewEvents
    id: ID!
    recommendation: String
    reviewerId: ID
    status: ReviewStatus
  }

  type ReviewEvents {
    createdAt: Date
    submittedAt: Date
    updatedAt: Date
  }

  type ReviewStatus {
    pending: Boolean
    submitted: Boolean
  }

  input CreateReviewInput {
    articleVersionId: ID!
    reviewerId: ID!
  }

  input UpdateReviewInput {
    content: String
    recommendation: String
    submit: Boolean
  }

  type ReviewerArticle {
    id: ID
    reviewerStatus: String
    title: String
  }

  extend type DashboardArticles {
    reviewer: [ReviewerArticle]
  }

  type ReviewerArticle {
    id: ID
    reviewerStatus: String
    title: String
  }
`

module.exports = typeDefs
