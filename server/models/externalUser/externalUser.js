/* 
  ** External User **

  This model is for temporarily storing people that are not registered in the
  system as users.

  Current use case is that an editor "stores" here a user whose email they
  have, so that they later invite them to sign up and review a paper.
*/

const BaseModel = require('@pubsweet/base-model')

const { email, stringNotEmpty } = require('../_helpers/types')

class ExternalUser extends BaseModel {
  constructor(properties) {
    super(properties)
    this.type = 'externalUser'
  }

  static get tableName() {
    return 'externalUser'
  }

  static get schema() {
    return {
      type: 'object',
      required: [],
      properties: {
        email,
        name: stringNotEmpty,
      },
    }
  }
}

module.exports = ExternalUser
