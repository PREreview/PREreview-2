const { model: ExternalTeam } = require('../../models/externalTeam')
// const { model: ExternalUser } = require('../../models/externalUser')

const getExternalTeamsForManuscript = async (_, { manuscriptId }, ctx) =>
  ExternalTeam.query().where({ manuscriptId })

module.exports = {
  ExternalTeam: {
    members(team, vars, ctx) {
      return ctx.connectors.ExternalUser.fetchSome(team.members, ctx)
    },
  },
  getExternalTeamsForManuscript,
}
