/* eslint-disable sort-keys */

const get = require('lodash/get')
const isEqual = require('lodash/isEqual')
const difference = require('lodash/difference')
const xor = require('lodash/xor')

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
  isGlobalTeamMember(user, ['editors', 'scienceOfficers'], context)

const isAuthor = async (user, object, context) =>
  isTeamMember(user, 'author', object, context)

const isAcceptedReviewer = (user, object, context) =>
  isTeamMember(user, 'reviewersAccepted', object, context)

const isInvitedReviewer = (user, object, context) =>
  isTeamMember(user, 'reviewersInvited', object, context)

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
    if (operation === 'isGlobalAndNotAuthor') return false

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

    if (object === 'Review') return true

    if (object && object.type === 'review') {
      const global = await isGlobal(user, context)
      const isUsersReview = userId === object.reviewerId

      return isUsersReview || global
    }

    return false
  },
  update: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    if (!user) return false

    // Everyone can update the manuscripts, in principle
    if (object === 'Manuscript') return true

    if (
      object.current &&
      object.current.type === 'manuscript' &&
      object.update
    ) {
      const { current, update } = object
      const initial = get(current, 'status.submission.initial')
      const full = get(current, 'status.submission.full')

      const changedFields = updatedProperties(current, update)

      // Nobody should be able to update the dataType before initial submission
      if (update.dataType !== current.dataType) {
        if (!full && !initial) return false
      }

      if (isGlobal(user, context)) {
        const editorWhitelist = [
          'communicationHistory',
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
          // return isGlobal(user, context)
          return true
        }
      }

      if (isAuthor(user, object, context)) {
        // WARNING: remove status
        const authorWhitelist = [
          'acknowledgements',
          'affiliations',
          'authors',
          'comments',
          'disclaimer',
          'funding',
          'geneExpression',
          'image',
          'imageCaption',
          'laboratory',
          'methods',
          'patternDescription',
          'reagents',
          'references',
          'suggestedReviewer',
          'title',
          'status',
        ]

        if (
          arrayContains(authorWhitelist, updatedProperties(current, update))
        ) {
          return isTeamMember(user, 'author', current, context)
        }
      }
    }

    if (object === 'Team') return true

    if (get(object, 'current.type') === 'team') {
      const { current, update } = object
      const teamType = get(object, 'current.teamType')
      const changed = Object.keys(update)

      // No one can update something other than members on existing teams
      if (!isEqual(changed, ['members'])) return false
      const affectedIds = xor(current.members, update.members)

      // Only global users can update the editor team members for an object
      const global = isGlobal(user, context)
      if (teamType === 'editor') return global

      // Only editors can update the reviewer teams
      const editor = isEditor(user, context)
      const editorAllow = ['reviewers', 'reviewersInvited']
      if (editorAllow.includes(teamType)) return editor

      // Only invited reviewers can alter accepted or rejected teams
      // They can only apply changes that affect themselves and no one else
      if (!isEqual(affectedIds, [userId])) return false
      const reviewerInvited = await isInvitedReviewer(
        user,
        { id: current.object.objectId }, // pass article as object, not team
        context,
      )
      const reviewerAllow = ['reviewersAccepted', 'reviewersRejected']
      if (reviewerAllow.includes(teamType)) return reviewerInvited
    }

    if (object === 'Review') return true

    if (get(object, 'current.type') === 'review') {
      const { current, update } = object

      // Cannot update someone else's review
      if (current.reviewerId !== userId) return false

      // Can only update these fields
      const whiteList = ['content', 'events', 'recommendation', 'status']
      const changedFields = Object.keys(update)
      const updateAllowedByWhitelist = arrayContains(whiteList, changedFields)
      return updateAllowedByWhitelist
    }

    return false
  },
  isAcceptedReviewer: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    return isAcceptedReviewer(user, object, context)
  },
  isAuthor: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    return isAuthor(user, object, context)
  },
  isEditor: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    return isEditor(user, context)
  },
  isGlobal: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    return isGlobal(user, context)
  },
  isGlobalAndNotAuthor: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    const global = await isGlobal(user, context)
    const author = await isAuthor(user, object, context)
    return (user.admin || global) && !author
  },
  isGlobalOrAcceptedReviewer: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    const global = await isGlobal(user, context)
    const accepted = await isAcceptedReviewer(user, object, context)
    return global || accepted
  },
  isScienceOfficer: async (userId, operation, object, context) => {
    const user = await context.models.User.find(getId(userId))
    return isScienceOfficer(user, context)
  },
}

module.exports = permissions
