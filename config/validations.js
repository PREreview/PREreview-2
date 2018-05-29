const Joi = require('joi')

module.exports = {
  collection: {
    title: Joi.string(),
  },
  fragment: {
    title: Joi.string(),
  },
}
