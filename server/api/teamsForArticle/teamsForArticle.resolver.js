const { Team } = require('pubsweet-server')

const resolver = async (_, vars, ctx) => {
  const { id } = vars
  let teams

  // TO DO -- currently have the version that doesn't use objection.js
  // Switch to Team.query().where(...) when you upgrade
  try {
    teams = await Team.findByField('object.objectId', id)
  } catch (e) {
    teams = []
  }

  return teams
}

module.exports = resolver
