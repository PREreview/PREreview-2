const permissions = {
  // eslint-disable-next-line consistent-return
  before: async (userId, operation, object, context) => {
    const user = await context.models.User.find(userId)
    if (user.admin) return true
  },
  create: (userId, operation, object, context) => {
    // console.log('\ncreate')
    // console.log('userId', userId)
    // console.log('operation', operation)
    // console.log('object', object)
    // console.log('context', context)

    if (object === 'teams') return true

    if (object.type === 'team') {
      if (object.teamType === 'author') return true
    }

    return false
  },
  read: (userId, operation, object, context) => {
    // console.log('\nread')
    // console.log('userId', userId)
    // console.log('operation', operation)
    // console.log('object', object)
    // console.log('context', context)

    if (object === 'teams') return true

    if (object.type === 'team') {
      if (object.teamType === 'author') {
        // TODO -- maybe not everyone should read author teams
        return true
      }
    }

    if (object === 'users') return true

    if (object.type === 'user') {
      if (object.id === userId) return true
    }

    return false
  },
}

module.exports = permissions
