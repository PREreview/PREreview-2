const { Team } = require('pubsweet-server')

const Review = require('./review')

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

const updateReview = async (_, vars, context) => {
  const { id, input } = vars
  const { content, recommendation, submit } = input

  const update = {
    content,
    events: {
      updatedAt: new Date(),
    },
    recommendation,
  }

  if (submit) {
    update.events.submittedAt = new Date()
    update.status = reviewSubmittedStatus
  }

  const review = await context.connectors.Review.update(id, update, context)
  return review.id
}

const userReviewsForArticle = async (_, vars, ctx) => {
  const { articleVersionId, reviewerId } = vars

  const reviews = await Review.query()
    .where('articleVersionId', articleVersionId)
    .andWhere('reviewerId', reviewerId)

  return reviews
}

const reviewsForArticle = async (_, vars, context) => {
  const { articleVersionId } = vars
  const reviews = await Review.findByField('articleVersionId', articleVersionId)

  const data = await reviews.map(async review => {
    const reviewer = await context.connectors.User.fetchOne(
      review.reviewerId,
      context,
    )

    return {
      reviewer,
      ...review,
    }
  })

  return Promise.all(data).then(res => res)
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

      return (await review.save()).id
    },
    updateReview,
  },
  Query: {
    reviewsForArticle,
    userReviewsForArticle,
  },
}

module.exports = resolvers
