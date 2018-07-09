// import request from 'request'
const request = require('request')
const _ = require('lodash')

const WbApi = app => {
  app.get('/api/wb/users', (req, res, next) => {
    const url = `http://tazendra.caltech.edu/~azurebrd/cgi-bin/forms/datatype_objects.cgi?action=autocompleteXHR&objectType=person&userValue=${
      req.query.search
    }`

    request(url, (error, response, body) => {
      // eslint-disable-next-line no-console
      if (error) return console.log(error)

      const entries = response.body.split('\n')

      const cleanEntries = _
        .remove(entries.map(entry => entry.split(' ( ')), item => {
          if (item.length !== 2) return false
          return true
        })
        .map(el => {
          const wbId = el[1].replace(')', '').trim()
          return [el[0], wbId]
        })

      const people = cleanEntries
        .map(entry => ({
          label: entry[0],
          value: entry[0],
          wbPerson: entry[1].slice(8),
        }))
        .slice(0, 8)

      const data = {
        values: people,
      }

      return res.send(data)
    })
  })
}

module.exports = WbApi
