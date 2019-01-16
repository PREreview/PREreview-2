const path = require('path')

module.exports = [
  // include app folder
  path.join(__dirname, '..', 'app'),
  // include pubsweet packages which are published untranspiled
  /xpub-[^/]+\/src/,
  /pubsweet-[^/\\]+\/(?!node_modules)/,
  /@pubsweet\/[^/\\]+\/(?!node_modules)/,
  // include other packages when this repo is mounted in a workspace
  /packages\/[^/\\]+\/(?!node_modules)/,
]
