const db = require('./dbHelpers')
const clone = require('lodash/clone')
const cloneDeep = require('lodash/cloneDeep')
const merge = require('lodash/merge')
const union = require('lodash/union')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

// TO DO -- get these from team helpers (import vs require)
const newStatus = {
  decision: {
    accepted: false,
    rejected: false,
    revise: false,
  },
  scienceOfficer: {
    approved: null,
    pending: false,
  },
  submission: {
    datatypeSelected: false,
    full: false,
    initial: false,
  },
}

const newReviewStatus = {
  pending: true,
  submitted: false,
}

const reviewSubmittedStatus = {
  pending: false,
  submitted: true,
}

const isMember = (team, userId) => team.members.includes(userId)

const isUserInGlobalTeams = (globalTeams, userId) =>
  globalTeams.some(team => isMember(team, userId))

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
    async createSubmission(_, vars, ctx) {
      const emptyManuscript = {
        status: cloneDeep(newStatus),
      }

      const manuscript = cloneDeep(emptyManuscript)
      const manuscriptDb = db.manuscriptGqlToDb(manuscript, ctx.user)
      manuscript.id = await db.save(manuscriptDb)

      return manuscript
    },
    async deleteManuscript(_, { id }) {
      await db.deleteManuscript(id)
      return id
    },
    async handleInvitation(_, { action, articleId, currentUserId }, context) {
      if (action !== 'accept' && action !== 'reject')
        throw new Error(
          `Invalid action provided to handleInvitation:
           Must be either "accept" or "reject"`,
        )

      let team

      if (action === 'accept') {
        const acceptTeams = await db.select({
          // object: { objectId: articleId },
          teamType: 'reviewersAccepted',
          type: 'team',
        })

        team = acceptTeams.find(
          t => t.object && t.object.objectId === articleId,
        )
      } else if (action === 'reject') {
        const rejectTeams = await db.select({
          // object: { objectId: articleId },
          teamType: 'reviewersRejected',
          type: 'team',
        })

        team = rejectTeams.find(
          t => t.object && t.object.objectId === articleId,
        )
      }

      if (!team) throw new Error('No team was found')

      const newMembers = union(team.members, [currentUserId])
      team.members = newMembers

      return context.connectors.team
        .update(team.id, { members: newMembers }, context)
        .then(res => res.id)
    },
    async updateManuscript(_, { data }, ctx) {
      const manuscript = await db.selectId(data.id)
      merge(manuscript, data)

      await db.update(db.manuscriptGqlToDb(manuscript), data.id)
      return manuscript
    },
    updateReview,
  },
  Query: {
    async dashboardArticles(_, { currentUserId }, context) {
      const { connectors } = context
      const articles = await db.select({ type: 'manuscript' })
      const teams = await db.select({ type: 'team' })
      const globalTeams = teams.filter(t => t.global)
      const isGlobal = isUserInGlobalTeams(globalTeams, currentUserId)

      const data = {
        author: [],
        editor: [],
        isGlobal,
        reviewer: [],
      }

      articles.forEach(article => {
        const articleTeams = teams.filter(
          a => a.object && a.object.objectId === article.id,
        )

        // Is user author of article
        const authorTeam = articleTeams.find(a => a.teamType === 'author')

        if (isMember(authorTeam, currentUserId)) {
          data.author.push(article)
        }

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

          // TO DO -- add review submitted status
          // Figure out status and attach to article
          if (isMember(acceptedReviewersTeam, currentUserId)) {
            status = 'accepted'
          } else if (isMember(rejectedReviewersTeam, currentUserId)) {
            status = 'rejected'
          } else {
            status = 'pendingDecision'
          }

          reviewArticle.reviewerStatus = status
          data.reviewer.push(reviewArticle)
        }

        // Is user an editor or science officer
        if (isGlobal && article.status.submission.initial) {
          const editorArticle = clone(article)

          const editorTeam = articleTeams.find(t => t.teamType === 'editor')
          const assignedEditorId = editorTeam.members[0]

          let assignedEditor
          if (assignedEditorId) {
            assignedEditor = connectors.user.fetchOne(assignedEditorId, context)
          }

          editorArticle.assignedEditor = assignedEditor
          data.editor.push(editorArticle)
        }
      })

      return data
    },
    async globalTeams() {
      const teams = await db.select({ global: true, type: 'team' })
      return teams
    },
    async manuscript(_, { id }) {
      return db.selectId(id)
    },
    async manuscripts() {
      return db.select({ type: 'manuscript' })
    },
    async teamsForArticle(_, { id }) {
      const selector = {
        'object.objectId': id,
        type: 'team',
      }
      const teams = await db.select(selector)
      return teams
    },
    userReviewsForArticle,
  },
}

module.exports = resolvers
