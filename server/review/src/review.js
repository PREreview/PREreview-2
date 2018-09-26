const BaseModel = require('@pubsweet/base-model')
const { Team } = require('pubsweet-server')

class Review extends BaseModel {
  static get tableName() {
    return 'reviews'
  }

  constructor(properties) {
    super(properties)
    this.type = 'review'
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
    //     props.data.type = 'review'
    //     props.data.owners = props.data.owners || []
    //   }
    // }
  }

  static get schema() {
    return {
      properties: {
        articleVersionId: { type: 'string', format: 'uuid' },
        status: { type: 'object' },
        events: { type: 'object' },
        content: { type: 'string' },
        reviewerId: { type: 'string', format: 'uuid' },
        recommendation: { type: 'string' },
      },
    }
  }

  async $beforeDelete() {
    await Team.deleteAssociated(this.data.type, this.id)
  }
}

Review.type = 'review'
module.exports = Review
