const mailgun = require('nodemailer-mailgun-transport')
const { apiKey, domain } = require('config').mailgun

const credentials = {
  auth: {
    api_key: apiKey,
    domain,
  },
}

module.exports = {
  transport: mailgun(credentials),
}
