const db = require('./dbHelpers')
const clone = require('lodash/clone')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

// TO DO -- get these from team helpers (import vs require)
const newReviewStatus = {
  pending: true,
  submitted: false,
}

const reviewSubmittedStatus = {
  pending: false,
  submitted: true,
}

const isMember = (team, userId) => team.members.includes(userId)
// END TO DO

const date = new GraphQLScalarType({
  description: 'Date custom scalar type',
  name: 'Date',
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value) // ast value is always in string format
    }
    return null
  },
  parseValue(value) {
    return new Date(value) // value from the client
  },
  serialize(value) {
    return value // value sent to the client
  },
})

const updateReview = async (_, vars, ctx) => {
  const { id, input } = vars
  const { content, recommendation, submit } = input

  const review = await db.selectId(id)
  if (!review) throw new Error(`No review found with id ${id}`)
  const data = clone(review)

  delete data.id
  data.type = 'review'
  data.content = content
  data.recommendation = recommendation
  data.events.updatedAt = new Date()

  if (submit) {
    data.events.submittedAt = new Date()
    data.status = reviewSubmittedStatus
  }
  // merge(data, input)

  return db.update(data, id).then(res => res)
}

const userReviewsForArticle = async (_, vars, ctx) => {
  const { articleVersionId, reviewerId } = vars

  const reviews = await db.select({
    articleVersionId,
    reviewerId,
    type: 'review',
  })

  return reviews
}

const resolvers = {
  Date: date,
  // TO DO -- deprecated
  HistoryEntry: {
    user(historyEntry, vars, ctx) {
      return ctx.connectors.user.fetchOne(historyEntry.user, ctx)
    },
  },
  Manuscript: {
    reviewer: async (manuscript, args, ctx) => {
      const teams = await db.select({ type: 'team' })
      const userReviews = await db.select({
        reviewerId: currentUserId,
        type: 'review',
      })
      const articles = await db.select({ type: 'manuscript' })

      const reviewer = []

      articles.forEach(article => {
        const articleTeams = teams.filter(
          a => a.object && a.object.objectId === article.id,
        )

        // Is user a reviewer of article
        const invitedReviewersTeam = articleTeams.find(
          t => t.teamType === 'reviewersInvited',
        )

        const acceptedReviewersTeam = articleTeams.find(
          t => t.teamType === 'reviewersAccepted',
        )

        const rejectedReviewersTeam = articleTeams.find(
          t => t.teamType === 'reviewersRejected',
        )

        if (isMember(invitedReviewersTeam, currentUserId)) {
          const reviewArticle = clone(article)
          let status

          // Figure out status and attach to article
          const hasSubmittedReviewForArticle = userReviews.find(
            review =>
              review.articleVersionId === article.id && review.status.submitted,
          )

          if (hasSubmittedReviewForArticle) {
            status = 'submitted'
          } else if (isMember(acceptedReviewersTeam, currentUserId)) {
            status = 'accepted'
          } else if (isMember(rejectedReviewersTeam, currentUserId)) {
            status = 'rejected'
          } else {
            status = 'pendingDecision'
          }

          reviewArticle.reviewerStatus = status
          reviewer.push(reviewArticle)
        }
      })
      return reviewer
    },
  },
  Mutation: {
    async createReview(_, vars, ctx) {
      const { input } = vars
      const review = clone(input)

      review.type = 'review'
      review.events = {
        createdAt: new Date(),
      }
      review.status = clone(newReviewStatus)

      await db.save(review)
      return review
    },
    updateReview,
  },
  Query: {
    userReviewsForArticle,
  },
}

module.exports = resolvers
