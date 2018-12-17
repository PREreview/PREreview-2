const { Team, User } = require('pubsweet-server')
const clone = require('lodash/clone')
const get = require('lodash/get')
const merge = require('lodash/merge')
const union = require('lodash/union')

const Manuscript = require('./manuscript')
const Review = require('../../review/src/review')
const notify = require('../../services/notify')

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

const cleanReviewStatus = {
  accepted: false,
  invited: false,
  submitted: false,
}

const isMember = (team, userId) => team && team.members.includes(userId)

const isUserInGlobalTeams = (globalTeams, user) =>
  user.admin || globalTeams.some(team => isMember(team, user.id))

// END TO DO

const resolvers = {
  // TO DO -- deprecated
  HistoryEntry: {
    user(historyEntry, vars, ctx) {
      return ctx.connectors.User.fetchOne(historyEntry.user, ctx)
    },
  },
  Mutation: {
    async createSubmission(_, vars, ctx) {
      const emptyManuscript = {
        status: newStatus,
      }
      const manuscript = await new Manuscript(emptyManuscript).save()
      return manuscript
    },
    async deleteManuscript(_, { id }) {
      await Manuscript.query().deleteById(id)
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
        let acceptTeams
        try {
          acceptTeams = await Team.findByField('teamType', 'reviewersAccepted')
        } catch (e) {
          acceptTeams = []
        }

        team = acceptTeams.find(
          t => t.object && t.object.objectId === articleId,
        )
      } else if (action === 'reject') {
        let rejectTeams
        try {
          rejectTeams = await Team.findByField('teamType', 'reviewersRejected')
        } catch (e) {
          rejectTeams = []
        }

        team = rejectTeams.find(
          t => t.object && t.object.objectId === articleId,
        )
      }

      if (!team) throw new Error('No team was found')

      const newMembers = union(team.members, [currentUserId])
      team.members = newMembers

      return context.connectors.Team.update(
        team.id,
        { members: newMembers },
        context,
      ).then(res => res.id)
    },
    async updateManuscript(_, { data }, ctx) {
      const manuscript = await ctx.connectors.Manuscript.fetchOne(data.id, ctx)
      const update = merge({}, manuscript, data)

      const updated = await ctx.connectors.Manuscript.update(
        data.id,
        update,
        ctx,
      )

      if (
        get(manuscript, 'status.submission.initial') === false &&
        get(data, 'status.submission.initial') === true
      ) {
        notify('initialSubmission', { object: update, userId: ctx.user })
      }

      if (
        get(manuscript, 'dataType') === null &&
        get(data, 'dataType') !== null
      ) {
        notify('dataTypeSelected', { object: update, userId: ctx.user })
      }

      if (
        get(manuscript, 'status.submission.full') === false &&
        get(data, 'status.submission.full') === true
      ) {
        notify('fullSubmission', { object: update, userId: ctx.user })
      }

      // return update
      return updated
    },
  },
  Query: {
    async dashboardArticles(_, { currentUserId }, context) {
      const { connectors } = context

      const articles = await Manuscript.query()
      const currentUser = await User.find(currentUserId)
      const reviews = await Review.all()
      const teams = await Team.all()

      const globalTeams = teams.filter(t => t.global)
      const isGlobal = isUserInGlobalTeams(globalTeams, currentUser)

      const data = {
        author: [],
        editor: [],
        isGlobal,
      }

      articles.forEach(article => {
        const articleCopy = clone(article)

        const articleTeams = teams.filter(
          t => t.object && t.object.objectId === article.id,
        )

        /* Create reviewer status */
        const invitedTeam = articleTeams.find(
          t => t.teamType === 'reviewersInvited',
        )

        const acceptedTeam = articleTeams.find(
          t => t.teamType === 'reviewersAccepted',
        )

        const submittedReview = reviews.find(
          r => r.articleVersionId === article.id && r.status.submitted,
        )

        const reviewerStatus = clone(cleanReviewStatus)

        if (invitedTeam && invitedTeam.members.length > 0)
          reviewerStatus.invited = true

        if (acceptedTeam && acceptedTeam.members.length > 0)
          reviewerStatus.accepted = true

        if (submittedReview) reviewerStatus.submitted = true
        /* End create reviewer status */

        articleCopy.status = {
          ...articleCopy.status,
          reviewers: reviewerStatus,
        }

        // User is author of article
        const authorTeam = articleTeams.find(t => t.teamType === 'author')

        if (isMember(authorTeam, currentUserId)) {
          data.author.push({ ...articleCopy })
        }

        // User is an editor or science officer
        if (isGlobal && article.status && article.status.submission.initial) {
          const editorTeam = articleTeams.find(t => t.teamType === 'editor')
          const assignedEditorId = editorTeam.members[0]

          let assignedEditor
          if (assignedEditorId) {
            assignedEditor = connectors.User.fetchOne(assignedEditorId, context)
          }

          data.editor.push({ ...articleCopy, assignedEditor })
        }
      })

      return data
    },
    async globalTeams() {
      let teams
      try {
        teams = await Team.findByField('global', true)
      } catch (e) {
        teams = []
      }
      return teams
    },
    async manuscript(_, { id }) {
      return Manuscript.find(id)
    },
    async manuscripts(_, vars, ctx) {
      return ctx.connectors.Manuscript.fetchAll(ctx)
    },
    async teamsForArticle(_, { id }) {
      let teams
      try {
        teams = await Team.findByField('object.objectId', id)
      } catch (e) {
        teams = []
      }
      return teams
    },
  },
}

module.exports = resolvers
