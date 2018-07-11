const request = require('request')

const baseUrl =
  'http://tazendra.caltech.edu/~azurebrd/cgi-bin/forms/datatype_objects.cgi'

const makeQuery = (objectType, search) => ({
  action: 'autocompleteXHR',
  objectType,
  userValue: search,
})

const makeRequest = (objectType, typeIdentifier, req, res) => {
  request(
    {
      qs: makeQuery(objectType, req.query.search),
      url: baseUrl,
    },
    (error, response, body) => {
      // eslint-disable-next-line no-console
      if (error) return console.log(error)

      // return callback(body)

      // console.log(body)
      // console.log(cleanData(body, typeIdentifier))

      return res.send({ values: cleanData(body, typeIdentifier) })
    },
  )
}

const cleanData = (data, typeIdentifier) =>
  data
    .split('\n')
    .map(entry =>
      entry
        .trim()
        .slice(0, -1)
        .replace('(', '.')
        .split('.')
        .map(item => item.trim()),
    )
    .filter(entry => entry.length === 2)
    .slice(0, 8)
    .map(item => {
      const formattedItem = {
        label: item[0],
        value: item[0],
      }
      formattedItem[typeIdentifier] = item[1] // eslint-disable-line
      return formattedItem
    })

const WbApi = app => {
  app.get('/api/wb/person', (req, res) => {
    makeRequest('person', 'wbPersonId', req, res)
  })

  app.get('/api/wb/laboratory', (req, res) => {
    makeRequest('laboratory', 'wbLabId', req, res)
  })

  app.get('/api/wb/species', (req, res) => {
    makeRequest('species', 'wbSpeciesId', req, res)
  })

  app.get('/api/wb/transgene', (req, res) => {
    makeRequest('transgene', 'wbTransgeneId', req, res)
  })

  app.get('/api/wb/reporter', (req, res) => {
    makeRequest('reporter', 'wbReporterId', req, res)
  })

  app.get('/api/wb/wbbt', (req, res) => {
    makeRequest('wbbt', 'wbWbbtId', req, res)
  })

  app.get('/api/wb/wbls', (req, res) => {
    makeRequest('wbls', 'wbWblsId', req, res)
  })

  app.get('/api/wb/gocc', (req, res) => {
    makeRequest('gocc', 'wbGoccId', req, res)
  })

  app.get('/api/wb/variation', (req, res) => {
    makeRequest('variation', 'wbVariationId', req, res)
  })

  app.get('/api/wb/backbonevector', (req, res) => {
    makeRequest('backbonevector', 'wbBackboneVectorId', req, res)
  })

  app.get('/api/wb/fusiontype', (req, res) => {
    makeRequest('fusion', 'wbFusionId', req, res)
  })
}

module.exports = WbApi