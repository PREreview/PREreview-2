const isEqual = require('lodash/isEqual')
const difference = require('lodash/difference')

// Helper functions
const isTeamMember = async (user, teamTypes, object, context) => {
  const teams = await Promise.all(
    user.teams.map(teamId => context.models.Team.find(getId(teamId))),
  )

  const teamTypesArray = Array.isArray(teamTypes) ? teamTypes : [teamTypes]

  const team = teams.find(
    aTeam =>
      !aTeam.global &&
      object.id === aTeam.object.objectId &&
      teamTypesArray.includes(aTeam.teamType),
  )
  return !!team
}

const isGlobalTeamMember = async (user, teamTypes, context) => {
  const teams = await Promise.all(
    user.teams.map(teamId => context.models.Team.find(getId(teamId))),
  )

  const teamTypesArray = Array.isArray(teamTypes) ? teamTypes : [teamTypes]

  const team = teams.find(
    aTeam => aTeam.global && teamTypesArray.includes(aTeam.teamType),
  )
  return !!team
}

const updatedProperties = (current, update) => {
  const diff = Object.keys(current).filter(k => {
    if (typeof current[k] === 'string') {
      return current[k] !== update[k]
    }
    return !isEqual(current[k], update[k])
  })
  return diff
}
const arrayContains = (superset, subset) =>
  difference(subset, superset).length === 0

const getId = objectOrString => {
  // In the browser client, ids are sometimes in an object, this is a way
  // to address that difference

  if (typeof objectOrString === 'string') {
    return objectOrString
  }
  return objectOrString.id
}

const permissions = {
  // eslint-disable-next-line consistent-return
  before: async (userId, operation, object, context) => {
    const user = await context.models.User.find(userId)
    if (user.admin) return true
  },
  create: (userId, operation, object, context) => true,
  read: async (userId, operation, object, context) => {
    const user = await context.models.User.find(userId)

    // Everyone can list the manuscripts
    if (object === 'Manuscript') {
      return true
    }

    // Only the author can see an unsubmitted manuscript
    if (object && object.type === 'manuscript') {
      if (object.status) {
        if (
          !object.status.submission.full &&
          !object.status.submission.initial
        ) {
          return isTeamMember(user, 'author', object, context)
        } else if (object.status.submission.initial) {
          const isAuthor = await isTeamMember(user, 'author', object, context)
          const isGlobal = await isGlobalTeamMember(
            user,
            ['editors', 'scienceOfficers'],
            context,
          )
          return isAuthor || isGlobal
        }
      }
    }

    // Everyone can read Teams
    if (object === 'Team') {
      return true
    }

    if (object && object.type === 'team') {
      return true
    }

    // Everyone can read Users
    if (object === 'User') {
      return true
    }

    if (object && object.type === 'user') {
      return true
    }

    return false
  },
  update: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))

    // Everyone can update the manuscripts, in principle
    if (user && object === 'Manuscript') {
      return true
    }

    if (
      object.current &&
      object.current.type === 'manuscript' &&
      object.update
    ) {
      // Nobody should be able to update the dataType before initial submission
      if (
        !object.current.status.submission.full &&
        !object.current.status.submission.initial &&
        object.update.dataType !== object.current.dataType
      ) {
        return false
      }

      // After initial submission, editors can change the dataType (and only the data type!)
      // WARNING: Authors should not be in this list, but currently the form submits new data!
      if (
        object.current.status.submission.initial &&
        object.update.dataType !== object.current.dataType &&
        arrayContains(
          ['dataType', 'decisionLetter', 'status', 'authors'],
          updatedProperties(object.current, object.update),
        )
      ) {
        return isGlobalTeamMember(user, ['editors', 'scienceOfficers'], context)
      }

      // WARNING: remove status
      // Whitelist for authors: acknowledgements, authors, comments, disclaimer, funding, geneExpression, image, laboratory, patternDescription, suggestedReviewer, title,
      if (
        arrayContains(
          [
            'acknowledgements',
            'authors',
            'comments',
            'disclaimer',
            'funding',
            'geneExpression',
            'image',
            'laboratory',
            'patternDescription',
            'suggestedReviewer',
            'title',
            'status',
          ],
          updatedProperties(object.current, object.update),
        )
      ) {
        return isTeamMember(user, 'author', object.current, context)
      }
    }

    return false
  },
}

module.exports = permissions
