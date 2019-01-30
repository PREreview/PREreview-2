const { deferConfig } = require('config/defer')
const path = require('path')
const winston = require('winston')
const mailgun = require('nodemailer-mailgun-transport')

const components = require('./components.json')

const mailTransport = mailgun({
  auth: {
    api_key: deferConfig(cfg => cfg.apiKey),
    domain: deferConfig(cfg => cfg.domain),
  },
})

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      // level: 'debug',
    }),
  ],
})

module.exports = {
  authsome: {
    mode: path.join(__dirname, 'authsome.js'),
    teams: {
      author: {
        name: 'Author',
      },
      editor: {
        name: 'Editor',
      },
      editors: {
        name: 'Editors Global',
      },
    },
  },
  detectionMethodCorrelations: {
    antibody: ['antibodyUsed'],
    existingTransgene: ['transgeneUsed'],
    genomeEditing: ['variation'],
    inSituHybridization: ['inSituDetails'],
    newTransgene: [
      'genotype',
      'constructionDetails',
      'dnaSequence',
      'utr',
      'reporter',
      'backboneVector',
      'fusionType',
      'constructComments',
      'transgeneName',
      'strain',
      'coinjected',
      'injectionConcentration',
      'integratedBy',
    ],
  },
  mailer: {
    from: 'noreply@mg.prereview.org',
    path: `${__dirname}/mailer`,
    transport: {
      mailTransport,
    },
  },
  publicKeys: [
    'pubsweet-client',
    'authsome',
    'pubsweet',
    'validations',
    'detectionMethodCorrelations',
  ],
  pubsweet: { components },
  'pubsweet-client': {
    API_ENDPOINT: '/api',
  },
  'pubsweet-server': {
    baseUrl: deferConfig(
      cfg => `${cfg['pubsweet-server'].host}:${cfg['pubsweet-server'].port}`,
    ),
    enableExperimentalGraphql: true,
    logger,
    tokenExpiresIn: '360 days',
    uploads: 'uploads',
  },
  schema: {},
  validations: path.join(__dirname, 'validations'),
}
