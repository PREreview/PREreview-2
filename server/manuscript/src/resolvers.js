const merge = require('lodash/merge')
const union = require('lodash/union')

const Manuscript = require('./manuscript')
const { Team } = require('pubsweet-server')
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

const isMember = (team, userId) => team && team.members.includes(userId)

const isUserInGlobalTeams = (globalTeams, userId) =>
  globalTeams.some(team => isMember(team, userId))

// END TO DO

const resolvers = {
  // TO DO -- deprecated
  HistoryEntry: {
    user(historyEntry, vars, ctx) {
      return ctx.connectors.user.fetchOne(historyEntry.user, ctx)
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
      const manuscript = await Manuscript.find(data.id)

      merge(manuscript, data)
      return manuscript.save()
    },
  },
  Query: {
    async dashboardArticles(_, { currentUserId }, context) {
      const { connectors } = context
      const articles = await Manuscript.query()
      const teams = await Team.all()
      const globalTeams = teams.filter(t => t.global)
      const isGlobal = isUserInGlobalTeams(globalTeams, currentUserId)

      const data = {
        author: [],
        editor: [],
        isGlobal,
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

        // Is user an editor or science officer
        if (isGlobal && article.status && article.status.submission.initial) {
          const editorTeam = articleTeams.find(t => t.teamType === 'editor')
          const assignedEditorId = editorTeam.members[0]

          let assignedEditor
          if (assignedEditorId) {
            assignedEditor = connectors.User.fetchOne(assignedEditorId, context)
          }

          data.editor.push({ ...article, assignedEditor })
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
    async manuscripts() {
      return Manuscript.query()
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
