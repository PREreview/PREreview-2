const db = require('./dbHelpers')
// const db = require('pubsweet-server/src/db')
const cloneDeep = require('lodash/cloneDeep')
const merge = require('lodash/merge')

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

const resolvers = {
  HistoryEntry: {
    user(historyEntry, vars, ctx) {
      return ctx.connectors.user.fetchOne(historyEntry.user, ctx)
    },
  },
  Mutation: {
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
    async updateManuscript(_, { data }, ctx) {
      // console.log('heeeeeere')
      // console.log('_', _)
      // console.log('vars', vars)
      // console.log('ctx', ctx)
      // const manuscript = cloneDeep(emptyManuscript)
      // const manuscriptDb = db.manuscriptGqlToDb(manuscript, ctx.user)
      // manuscript.id = await db.save(manuscriptDb)
      // return manuscript
      // async updateSubmission(_, { data }, ctx) {
      // logger.debug('Update Submission - starting')

      const manuscript = await db.selectId(data.id)
      // db.checkPermission(manuscript, ctx.user)
      merge(manuscript, data)

      await db.update(db.manuscriptGqlToDb(manuscript), data.id)
      // logger.debug(`Updated Submission ${data.id} by user ${ctx.user}`)

      return manuscript
      // },
    },
  },
  Query: {
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
  },
}

module.exports = resolvers
