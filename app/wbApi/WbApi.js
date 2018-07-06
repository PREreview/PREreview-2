// import request from 'request'
const request = require('request')
const _ = require('lodash')

const WbApi = app => {
  app.get('/api/wb/users', (req, res, next) => {
    const url = `http://tazendra.caltech.edu/~azurebrd/cgi-bin/forms/datatype_objects.cgi?action=autocompleteXHR&objectType=person&userValue=${
      req.query.search
    }`

    // console.log('hit it', req)

    request(url, (error, response, body) => {
      // eslint-disable-next-line no-console
      if (error) return console.log(error)

      // console.log(response)
      // res.send(re)
      // console.log(typeof response)
      const entries = response.body.split('\n')
      // console.log('arr', entries)

      const cleanEntries = _
        .remove(
          entries.map(
            entry => entry.split(' ( '),
            // if (entryAsArray.length !== 2) return
            // console.log(entryAsArray, entryAsArray.length)
            // entryAsArray[1] = entryAsArray[1].replace(')', '').trim()
            // console.log(entryAsArray)
          ),
          item => {
            // return
            if (item.length !== 2) return false
            // console.log(item)
            // return .replace(')', '').trim()
            return true
          },
        )
        .map(el => {
          const wbId = el[1].replace(')', '').trim()
          // console.log(el)
          return [el[0], wbId]
        })

      // console.log(cleanEntries[0])
      // console.log(cleanEntries[0][1].slice(8))

      const people = cleanEntries
        .map(entry => ({
          name: entry[0],
          wbPerson: entry[1].slice(8),
        }))
        .slice(0, 8)

      const data = {
        people,
      }

      return res.send(data)
    })
  })
}

module.exports = WbApi
