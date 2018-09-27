const Review = require('../src/review')
const { Team } = require('pubsweet-server')

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

const updateReview = async (_, vars, ctx) => {
  const { id, input } = vars
  const { content, recommendation, submit } = input

  const review = await Review.find(id)
  if (!review) throw new Error(`No review found with id ${id}`)

  review.content = content
  review.recommendation = recommendation
  review.events.updatedAt = new Date()

  if (submit) {
    review.events.submittedAt = new Date()
    review.status = reviewSubmittedStatus
  }

  return review.save()
}

const userReviewsForArticle = async (_, vars, ctx) => {
  const { articleVersionId, reviewerId } = vars

  const reviews = await Review.query()
    .where('articleVersionId', articleVersionId)
    .andWhere('reviewerId', reviewerId)

  return reviews
}

const resolvers = {
  DashboardArticles: {
    reviewer: async (manuscript, args, ctx) => {
      const { model: Manuscript } = require('../../manuscript/src') // eslint-disable-line global-require

      const teams = await Team.all()
      const userReviews = await Review.findByField('reviewerId', ctx.user)
      const articles = await Manuscript.query()

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

        if (isMember(invitedReviewersTeam, ctx.user)) {
          let status

          // Figure out status and attach to article
          const hasSubmittedReviewForArticle = userReviews.find(
            review =>
              review.articleVersionId === article.id && review.status.submitted,
          )

          if (hasSubmittedReviewForArticle) {
            status = 'submitted'
          } else if (isMember(acceptedReviewersTeam, ctx.user)) {
            status = 'accepted'
          } else if (isMember(rejectedReviewersTeam, ctx.user)) {
            status = 'rejected'
          } else {
            status = 'pendingDecision'
          }

          reviewer.push({ ...article, reviewerStatus: status })
        }
      })
      return reviewer
    },
  },
  // TO DO -- deprecated
  HistoryEntry: {
    user(historyEntry, vars, ctx) {
      return ctx.connectors.User.fetchOne(historyEntry.user, ctx)
    },
  },
  Mutation: {
    async createReview(_, vars, ctx) {
      const { input } = vars
      const review = new Review(input)

      review.events = {
        createdAt: new Date(),
      }
      review.status = newReviewStatus

      await review.save()
      return review
    },
    updateReview,
  },
  Query: {
    userReviewsForArticle,
  },
}

module.exports = resolvers
