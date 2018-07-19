const db = require('./dbHelpers')
// const db = require('pubsweet-server/src/db')
const cloneDeep = require('lodash/cloneDeep')

const resolvers = {
  Mutation: {
    async createSubmission(_, vars, ctx) {
      const emptyManuscript = {
        status: {
          initialSubmission: false,
          submitted: false,
        },
      }

      const manuscript = cloneDeep(emptyManuscript)
      const manuscriptDb = db.manuscriptGqlToDb(manuscript, ctx.user)
      manuscript.id = await db.save(manuscriptDb)

      return manuscript
    },

    async updateManuscript(_, vars, ctx) {
      // console.log('heeeeeere')
      // console.log('_', _)
      // console.log('vars', vars)
      // console.log('ctx', ctx)
      // const manuscript = cloneDeep(emptyManuscript)
      // const manuscriptDb = db.manuscriptGqlToDb(manuscript, ctx.user)
      // manuscript.id = await db.save(manuscriptDb)
      // return manuscript
    },
  },
  Query: {
    async manuscript(_, { id }) {
      return db.selectId(id)
    },
    async manuscripts() {
      return db.select({ type: 'manuscript' })
    },
  },
}

module.exports = resolvers
