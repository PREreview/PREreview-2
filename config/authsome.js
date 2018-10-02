/* eslint-disable sort-keys */

const get = require('lodash/get')
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

const isEditor = (user, context) =>
  isGlobalTeamMember(user, ['editors'], context)

const isScienceOfficer = (user, context) =>
  isGlobalTeamMember(user, ['scienceOfficers'], context)

const isGlobal = (user, context) =>
  isEditor(user, context) || isScienceOfficer(user, context)

const isAuthor = async (user, object, context) =>
  isTeamMember(user, 'author', object, context)

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
          const isAuthorMember = await isAuthor(user, object, context)
          const isGlobalMember = await isGlobal(user, context)
          return isAuthorMember || isGlobalMember
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
      const { current, update } = object
      // console.log(current, update)
      const initial = get(current, 'status.submission.initial')
      const full = get(current, 'status.submission.full')

      const changedFields = updatedProperties(current, update)

      // Nobody should be able to update the dataType before initial submission
      if (!full && !initial && update.dataType !== current.dataType) {
        return false
      }

      // WARNING: Authors should not be in this list, but currently the form submits new data!
      const editorWhitelist = [
        'authors',
        'currentlyWith',
        'dataType',
        'decisionLetter',
        'status',
      ]

      // Allow editors to change fields in their whitelist
      // (only after initial submission)
      if (
        initial &&
        // update.dataType !== current.dataType &&
        arrayContains(editorWhitelist, changedFields)
      ) {
        return isGlobal(user, context)
      }

      // WARNING: remove status
      const authorWhitelist = [
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
      ]
      // console.log(
      //   arrayContains(authorWhitelist, updatedProperties(current, update)),
      // )
      if (arrayContains(authorWhitelist, updatedProperties(current, update))) {
        return isTeamMember(user, 'author', current, context)
      }

      // console.log('now?', object)
    }

    if (object === 'Team') {
      return true
    }

    // console.log('nothing', object)

    if (get(object, 'current.type') === 'team') {
      // Only global users can update the editor team members for an object
      if (get(object, 'current.teamType') === 'editor') {
        if (isGlobal(user, context)) return true
      }
    }

    return false
  },
  isGlobal: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    return isGlobal(user, context)
  },
  isAuthor: async (userId, operation, object, context) => {
    // console.log('is author? !!!!!!!!!!!!!!!!!!!')
    // console.log(object)
    const user = await context.models.User.find(getId(userId))
    // console.log(isAuthor(user, object, context))
    return isAuthor(user, object, context)
  },
}

module.exports = permissions
