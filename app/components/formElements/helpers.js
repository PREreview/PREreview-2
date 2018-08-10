import { v4 as uuid } from 'uuid'

import _, {
  cloneDeep,
  // cloneDeepWith,
  find,
  // merge,
  mergeWith,
  keys,
  // pickBy,
  omit,
  omitBy,
  // set,
  union,
} from 'lodash'

let defaultFormValues = {
  acknowledgements: '',
  author: {
    email: '',
    name: '',
    WBId: '',
  },
  coAuthors: [
    {
      id: uuid(),
      name: '',
      WBId: '',
    },
  ],
  comments: '',
  dataType: '',
  disclaimer: false,
  funding: '',
  geneExpression: {
    antibodyUsed: '',
    backboneVector: {
      name: '',
      WBId: '',
    },
    coinjected: '',
    constructComments: '',
    constructionDetails: '',
    detectionMethod: '',
    dnaSequence: [
      {
        id: uuid(),
        name: '',
        WBId: '',
      },
    ],
    expressionPattern: {
      name: '',
      WBId: '',
    },
    fusionType: {
      name: '',
      WBId: '',
    },
    genotype: '',
    injectionConcentration: '',
    inSituDetails: '',
    integratedBy: {
      name: '',
      WBId: '',
    },
    observeExpression: {
      certainly: [
        {
          certainly: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          during: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          id: uuid(),
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
      not: [
        {
          during: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          id: uuid(),
          not: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
      partially: [
        {
          during: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          id: uuid(),
          partially: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
      possibly: [
        {
          during: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          id: uuid(),
          possibly: {
            id: uuid(),
            name: '',
            WBId: '',
          },
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
    },
    reporter: {
      name: '',
      WBId: '',
    },
    species: {
      name: '',
      WBId: '',
    },
    strain: '',
    transgeneName: '',
    transgeneUsed: [
      {
        id: uuid(),
        name: '',
        WBId: '',
      },
    ],
    utr: {
      name: '',
      WBId: '',
    },
    variation: {
      name: '',
      WBId: '',
    },
  },
  image: {},
  laboratory: {
    name: '',
    WBId: '',
  },
  patternDescription: '<p></p>',
  suggestedReviewer: '',
  title: '',
}

if (process.env.NODE_ENV === 'development') {
  defaultFormValues = {
    acknowledgements: '',
    author: {
      email: 'john@john.com',
      name: 'John A Bryden',
      WBId: 'WBPerson6903',
    },
    coAuthors: [
      { id: uuid(), name: 'Yanna Cen', WBId: 'WBPerson18694' },
      { id: uuid(), name: 'Alec Barret', WBId: 'WBPerson15466' },
    ],
    comments: '<p>some comments here</p>',
    dataType: '',
    disclaimer: true,
    funding: 'blah',
    geneExpression: {
      antibodyUsed: 'an antibody',
      backboneVector: {
        name: '',
        WBId: '',
      },
      coinjected: '',
      constructComments: '',
      constructionDetails: '',
      detectionMethod: 'antibody',
      // detectionMethod: 'genomeEditing',
      dnaSequence: [
        {
          id: uuid(),
          name: '',
          WBId: '',
        },
      ],
      expressionPattern: {
        name: 'some expression',
        WBId: '',
      },
      fusionType: {
        name: '',
        WBId: '',
      },
      genotype: '',
      injectionConcentration: '',
      inSituDetails: '',
      integratedBy: {
        name: '',
        WBId: '',
      },
      observeExpression: {
        certainly: [
          {
            certainly: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            during: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            id: uuid(),
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
        not: [
          {
            during: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            id: uuid(),
            not: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
        partially: [
          {
            during: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            id: uuid(),
            partially: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
        possibly: [
          {
            during: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            id: uuid(),
            possibly: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
      },
      reporter: {
        name: '',
        WBId: '',
      },
      species: {
        name: 'a species',
        WBId: '',
      },
      strain: '',
      transgeneName: '',
      transgeneUsed: [
        {
          id: uuid(),
          name: 'Some',
          WBId: '',
        },
        {
          id: uuid(),
          name: 'Some',
          WBId: '',
        },
      ],
      utr: {
        name: '',
        WBId: '',
      },
      variation: {
        name: '',
        WBId: '',
      },
    },
    image: {},
    laboratory: {
      name: 'Jean-Claude Labbe',
      WBId: 'UM',
    },
    // patternDescription: '<p>this is it</p>',
    patternDescription: '<p>Hello there</p>',
    suggestedReviewer: '',
    title: 'titlez',
  }
}

const dataToFormValues = data => {
  const defaultValues = cloneDeep(defaultFormValues)
  const values = cloneDeep(data)
  const { authors, image } = data

  // console.log('data', data)

  if (authors) {
    const modAuthors = authors.map(item => {
      const modAuthor = cloneDeep(item)
      // if (item.wormBaseId) {
      //   modAuthor.WBPerson = item.wormBaseId
      //   delete modAuthor.wormBaseId
      // }
      modAuthor.id = uuid()
      return omit(modAuthor, '__typename')
    })

    const author = find(modAuthors, entry => entry.submittingAuthor)
    values.coAuthors = omitBy(modAuthors, entry => entry.submittingAuthor)
    values.author = author

    // values.coAuthors = authors
  }

  delete values.authors
  delete values.__typename // eslint-disable-line no-underscore-dangle

  // eslint-disable-next-line no-underscore-dangle
  if (image && image.__typename) {
    // console.log('here i am')
    // delete image.__typename // eslint-disable-line no-underscore-dangle
    values.image = omit(image, '__typename')
  }
  // console.log(image.__typename)
  // console.log(values)
  // console.log(data.patternDescription, values.patternDescription)
  // console.log('values after data', merge(values, defaultFormValues))
  // return merge(values, defaultFormValues)
  // return merge(defaultFormValues, values)

  // console.log(
  //   'this',
  //   mergeWith(defaultValues, values, (defaultValue, incomingValue) => {
  //     // console.log(defaultValue, incomingValue)
  //     if (Array.isArray(defaultValue)) {
  //       // return defaultValue.concat(incomingValue)
  //       // incomingValue = values(incomingValue)
  //       return incomingValue === null ? defaultValue : _.values(incomingValue)
  //     }
  //     return incomingValue === null ? defaultValue : incomingValue
  //   }),
  // )

  return mergeWith(defaultValues, values, (defaultValue, incomingValue) => {
    // console.log(defaultValue, incomingValue)
    if (Array.isArray(defaultValue)) {
      // return defaultValue.concat(incomingValue)
      // incomingValue = values(incomingValue)
      return incomingValue === null ? defaultValue : _.values(incomingValue)
    }
    return incomingValue === null ? defaultValue : incomingValue
  })
}

const formValuesToData = values => {
  const data = cloneDeep(values)

  // TODO -- write data cleanup functions (eg. remove __typename)
  // const data = cloneDeepWith(values, (val, key) => {
  //   console.log(key, val)
  //   if (key === '__typename') return false
  //   return val
  // })

  const { author, coAuthors, status } = data

  // console.log(data)

  data.authors = union([], coAuthors)
  // console.log(data.authors)

  author.submittingAuthor = true
  data.authors.push(author)

  // if (coAuthors)
  data.authors = data.authors.map(item => {
    const modAuthor = cloneDeep(item)
    // modAuthor.wormBaseId = modAuthor.WBPerson
    // delete modAuthor.WBPerson
    delete modAuthor.id
    return modAuthor
  })

  // if (author) {
  //   console.log('yes author')
  //   author.submittingAuthor = true
  //   // if (coAuthors) coAuthors.push(author)
  //   if (!data.authors) data.authors = []

  //   // delete data.author
  //   // delete data.coAuthors
  // }

  // eslint-disable-next-line no-underscore-dangle
  if (status) delete status.__typename

  delete data.author
  delete data.coAuthors

  // eslint-disable-next-line no-underscore-dangle
  delete data.laboratory.__typename

  if (data.geneExpression) {
    // eslint-disable-next-line no-underscore-dangle
    delete data.geneExpression.__typename

    if (data.geneExpression.dnaSequence) {
      data.geneExpression.dnaSequence.forEach(item => {
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        delete item.__typename
        // eslint-disable-next-line no-param-reassign
        delete item.id
      })
    }

    if (data.geneExpression.transgeneUsed) {
      data.geneExpression.transgeneUsed.forEach(item => {
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        delete item.__typename
        // eslint-disable-next-line no-param-reassign
        delete item.id
      })
    }

    if (data.geneExpression.variation) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.variation.__typename
    }

    if (data.geneExpression.utr) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.utr.__typename
    }

    if (data.geneExpression.species) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.species.__typename
    }

    if (data.geneExpression.reporter) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.reporter.__typename
    }

    if (data.geneExpression.integratedBy) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.integratedBy.__typename
    }

    if (data.geneExpression.fusionType) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.fusionType.__typename
    }

    if (data.geneExpression.expressionPattern) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.expressionPattern.__typename
    }

    if (data.geneExpression.backboneVector) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.backboneVector.__typename
    }

    if (data.geneExpression.observeExpression) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete data.geneExpression.observeExpression.__typename

      keys(data.geneExpression.observeExpression).forEach(key => {
        // console.log('key', key)
        data.geneExpression.observeExpression[key].forEach(item => {
          // console.log('item', item)
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          delete item.__typename
          // eslint-disable-next-line no-param-reassign
          delete item.id

          _.values(item).forEach(entry => {
            // eslint-disable-next-line no-underscore-dangle, no-param-reassign
            delete entry.__typename
            // eslint-disable-next-line no-param-reassign
            delete entry.id
          })
        })
      })
    }
  }

  // console.log(keys(data))
  const autocompleteKeys = keys(data).filter(key => {
    const match = key.match(/react-autowhatever*/)
    // console.log(key, match)
    return match !== null
  })

  // console.log(autocompleteKeys) //, self)
  // const self = this
  autocompleteKeys.forEach(key => delete data[key])
  // console.log(data)

  // throw fjdlksjlfj
  // console.log(data.authors)

  // console.log('final', data)
  return data
}

const getParentField = field =>
  field
    .split('.')
    .slice(0, -1)
    .join('.')

// When a suggestion is selected, set the WB id
const onSuggestionSelected = (event, options, setFieldValue, name) => {
  const field = getParentField(name)
  setFieldValue(`${field}.WBId`, options.suggestion.WBId)
}

// When the autocomplete value changes, remove the WB id
const onAutocompleteChange = (e, field, setFieldValue, handleChange) => {
  const parent = getParentField(field)
  setFieldValue(`${parent}.WBId`, '')
  handleChange(e)
}

export {
  dataToFormValues,
  formValuesToData,
  onAutocompleteChange,
  onSuggestionSelected,
}
