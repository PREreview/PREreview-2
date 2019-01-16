/* eslint-disable global-require */

module.exports = {
  server: () => app => require('./WbApi')(app),
}
