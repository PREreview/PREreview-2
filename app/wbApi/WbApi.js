const request = require('request')

const baseUrl =
  'http://tazendra.caltech.edu/~azurebrd/cgi-bin/forms/datatype_objects.cgi'

const makeQuery = (objectType, query) => ({
  action: 'autocompleteXHR',
  objectType,
  userValue: query.search,
})

const makeValidateQuery = (objectType, query) => ({
  action: 'asyncValidValue',
  objectType,
  userValue: encodeURI(`${query.search} ( ${query.id} ) `),
})

const makeRequest = (objectType, req, res) => {
  request(
    {
      qs: makeQuery(objectType, req.query),
      url: baseUrl,
    },
    (error, response, body) => {
      // eslint-disable-next-line no-console
      if (error) return console.log(error)
      return res.send({ values: cleanData(body) })
    },
  )
}

const makeValidateRequest = (objectType, req, res) => {
  request(
    {
      qs: makeValidateQuery(objectType, req.query),
      url: baseUrl,
    },
    (error, response, body) => {
      // eslint-disable-next-line no-console
      if (error) return console.log(error)
      const result = body.replace('\n', '') === 'true'
      return res.send({ data: { result } })
    },
  )
}

const cleanData = data =>
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
      formattedItem.WBId = item[1] // eslint-disable-line
      return formattedItem
    })

const WbApi = app => {
  /**
   * GET ENDPOINTS
   */

  app.get('/api/wb/backbonevector', (req, res) => {
    makeRequest('backbonevector', req, res)
  })

  app.get('/api/wb/fusiontype', (req, res) => {
    makeRequest('fusion', req, res)
  })

  app.get('/api/wb/gene', (req, res) => {
    makeRequest('gene', req, res)
  })

  app.get('/api/wb/gocc', (req, res) => {
    makeRequest('gocc', req, res)
  })

  app.get('/api/wb/integrationmethod', (req, res) => {
    makeRequest('integrationmethod', req, res)
  })

  app.get('/api/wb/laboratory', (req, res) => {
    makeRequest('laboratory', req, res)
  })

  app.get('/api/wb/person', (req, res) => {
    makeRequest('person', req, res)
  })

  app.get('/api/wb/reporter', (req, res) => {
    makeRequest('reporter', req, res)
  })

  app.get('/api/wb/species', (req, res) => {
    makeRequest('species', req, res)
  })

  app.get('/api/wb/transgene', (req, res) => {
    makeRequest('transgene', req, res)
  })

  app.get('/api/wb/variation', (req, res) => {
    makeRequest('variation', req, res)
  })

  app.get('/api/wb/wbbt', (req, res) => {
    makeRequest('wbbt', req, res)
  })

  app.get('/api/wb/wbls', (req, res) => {
    makeRequest('wbls', req, res)
  })

  /**
   * VALIDATION ENDPOINTS
   */

  app.get('/api/wb/validate/person', (req, res) => {
    makeValidateRequest('person', req, res)
  })

  app.get('/api/wb/validate/laboratory', (req, res) => {
    makeValidateRequest('laboratory', req, res)
  })

  app.get('/api/wb/validate/species', (req, res) => {
    makeValidateRequest('species', req, res)
  })

  app.get('/api/wb/validate/transgene', (req, res) => {
    makeValidateRequest('transgene', req, res)
  })

  app.get('/api/wb/validate/reporter', (req, res) => {
    makeValidateRequest('reporter', req, res)
  })

  app.get('/api/wb/validate/wbbt', (req, res) => {
    makeValidateRequest('wbbt', req, res)
  })

  app.get('/api/wb/validate/wbls', (req, res) => {
    makeValidateRequest('wbls', req, res)
  })

  app.get('/api/wb/validate/gocc', (req, res) => {
    makeValidateRequest('gocc', req, res)
  })

  app.get('/api/wb/validate/variation', (req, res) => {
    makeValidateRequest('variation', req, res)
  })

  app.get('/api/wb/validate/backbonevector', (req, res) => {
    makeValidateRequest('backbonevector', req, res)
  })

  app.get('/api/wb/validate/fusiontype', (req, res) => {
    makeValidateRequest('fusion', req, res)
  })

  app.get('/api/wb/validate/integrationmethod', (req, res) => {
    makeValidateRequest('integrationmethod', req, res)
  })

  app.get('/api/wb/validate/gene', (req, res) => {
    makeValidateRequest('gene', req, res)
  })
}

module.exports = WbApi
