/* 
  ** External Team **

  This is similar to a team, but for external people (ie. people that are not
  proper users in the system).

  The current use case is to store invited reviewers that are not in the system
  in a team, and move them to a proper team once they sign up.
*/

/* eslint-disable sort-keys */
const BaseModel = require('@pubsweet/base-model')

const { arrayOfIds, id, stringNotEmpty } = require('../_helpers/types')

class ExternalTeam extends BaseModel {
  constructor(properties) {
    super(properties)
    this.type = 'externalTeam'
  }

  static get tableName() {
    return 'externalTeam'
  }

  static get schema() {
    return {
      type: 'object',
      required: ['manuscriptId', 'members', 'teamType'],
      properties: {
        manuscriptId: id,
        members: arrayOfIds,
        teamType: stringNotEmpty,
      },
    }
  }
}

module.exports = ExternalTeam
