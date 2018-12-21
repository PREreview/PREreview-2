const BaseModel = require('@pubsweet/base-model')
const { Team } = require('pubsweet-server')

class Manuscript extends BaseModel {
  static get tableName() {
    return 'manuscripts'
  }

  constructor(properties) {
    super(properties)
    this.type = 'manuscript'
  }

  static get schema() {
    return {
      properties: {
        acknowledgements: { type: ['string', 'null'] },
        authors: {
          items: { type: 'object' },
          type: ['array', 'null'],
        },
        comments: { type: ['string', 'null'] },
        communicationHistory: {
          items: { type: 'object' },
          type: ['array', 'null'],
        },
        currentlyWith: { format: 'uuid', type: ['string', 'null'] },
        data: { type: ['object', 'null'] },
        dataType: { type: ['string', 'null'] },
        decisionLetter: { type: ['string', 'null'] },
        disclaimer: { type: ['boolean', 'null'] },
        funding: { type: ['string', 'null'] },
        geneExpression: { type: ['object', 'null'] },
        image: { type: ['object', 'null'] },
        imageCaption: { type: ['string', 'null'] },
        laboratory: { type: ['object', 'null'] },
        methods: { type: ['string', 'null'] },
        patternDescription: { type: ['string', 'null'] },
        reagents: { type: ['string', 'null'] },
        references: { type: ['string', 'null'] },
        status: { type: ['object', 'null'] },
        suggestedReviewer: { type: ['object', 'null'] },
        title: { type: 'string' },
      },
    }
  }

  async $beforeDelete() {
    await Team.deleteAssociated(this.data.type, this.id)
  }
}

Manuscript.type = 'manuscript'
module.exports = Manuscript
