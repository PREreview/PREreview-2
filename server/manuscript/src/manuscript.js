const BaseModel = require('@pubsweet/base-model')
const { Team } = require('pubsweet-server')

class Manuscript extends BaseModel {
  static get tableName() {
    return 'manuscripts'
  }

  constructor(properties) {
    super(properties)
    this.type = 'manuscript'
    // this.owners = this.owners || []
    // console.log('oy', properties)
    // const props = {}
    // if (properties) {
    //   props.id = properties.id
    //   props.data = properties
    // }
    // if (props.data) {
    //   if (props.data.id) {
    //     delete props.data.id
    //   }
    //   if (props.data) {
    //     props.data.type = 'manuscript'
    //     props.data.owners = props.data.owners || []
    //   }
    // }
  }

  static get schema() {
    return {
      properties: {
        data: { type: 'object' },
        title: { type: 'string' },
        authors: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
        },
        status: { type: 'object' },
      },
    }
  }

  async $beforeDelete() {
    await Team.deleteAssociated(this.data.type, this.id)
  }
}

Manuscript.type = 'manuscript'
module.exports = Manuscript
