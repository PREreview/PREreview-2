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
    credit: [''],
    email: '',
    name: '',
    WBId: '',
  },
  coAuthors: [
    {
      credit: [''],
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
          subcellularLocalization: {
            id: uuid(),
            name: '',
            WBId: '',
          },
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
          subcellularLocalization: {
            id: uuid(),
            name: '',
            WBId: '',
          },
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
          subcellularLocalization: {
            id: uuid(),
            name: '',
            WBId: '',
          },
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
          subcellularLocalization: {
            id: uuid(),
            name: '',
            WBId: '',
          },
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
  suggestedReviewer: {
    name: '',
    WBId: '',
  },
  title: '',
}

if (process.env.NODE_ENV === 'development') {
  defaultFormValues = {
    acknowledgements: '',
    author: {
      credit: ['software'],
      email: 'john@john.com',
      name: 'John A Bryden',
      WBId: 'WBPerson6903',
    },
    coAuthors: [
      {
        credit: ['formalAnalysis'],
        id: uuid(),
        name: 'Yanna Cen',
        WBId: 'WBPerson18694',
      },
      {
        credit: ['dataCuration'],
        id: uuid(),
        name: 'Alec Barret',
        WBId: 'WBPerson15466',
      },
    ],
    comments: '<p>some comments here</p>',
    dataType: 'geneExpression',
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
        WBId: '1',
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
            subcellularLocalization: {
              id: uuid(),
              name: '',
              WBId: '',
            },
          },
        ],
        not: [
          {
            during: {
              id: uuid(),
              name: 'soma',
              WBId: '67',
            },
            id: uuid(),
            not: {
              id: uuid(),
              name: '',
              WBId: '',
            },
            subcellularLocalization: {
              id: uuid(),
              name: '',
              WBId: '',
            },
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
            subcellularLocalization: {
              id: uuid(),
              name: '',
              WBId: '',
            },
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
            subcellularLocalization: {
              id: uuid(),
              name: '',
              WBId: '',
            },
          },
        ],
      },
      reporter: {
        name: '',
        WBId: '',
      },
      species: {
        name: 'Caenorhabditis brenneri',
        WBId: 'Caenorhabditis brenneri',
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
    patternDescription: '<p>Hello there</p>',
    suggestedReviewer: {
      name: 'John C Cooper',
      WBId: 'lklajfldjsf',
    },
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

/* eslint-disable no-underscore-dangle, no-param-reassign */
// TODO -- write data cleanup functions (eg. remove __typename)
const formValuesToData = values => {
  const data = cloneDeep(values)
  const { author, coAuthors, status } = data

  if (author && coAuthors) {
    data.authors = union([], coAuthors)
    author.submittingAuthor = true
    data.authors.push(author)

    data.authors = data.authors.map(item => {
      const modAuthor = cloneDeep(item)
      delete modAuthor.id
      delete modAuthor.__typename
      return modAuthor
    })
  }

  if (status) {
    delete status.__typename
    if (status.decision) delete status.decision.__typename
    if (status.scienceOfficer) delete status.scienceOfficer.__typename
    if (status.submission) delete status.submission.__typename
  }

  delete data.author
  delete data.coAuthors

  if (data.laboratory) delete data.laboratory.__typename

  if (data.geneExpression) {
    delete data.geneExpression.__typename

    if (data.geneExpression.dnaSequence) {
      data.geneExpression.dnaSequence.forEach(item => {
        delete item.__typename
        delete item.id
      })
    }

    if (data.geneExpression.transgeneUsed) {
      data.geneExpression.transgeneUsed.forEach(item => {
        delete item.__typename
        delete item.id
      })
    }

    if (data.geneExpression.variation) {
      delete data.geneExpression.variation.__typename
    }

    if (data.geneExpression.utr) {
      delete data.geneExpression.utr.__typename
    }

    if (data.geneExpression.species) {
      delete data.geneExpression.species.__typename
    }

    if (data.geneExpression.reporter) {
      delete data.geneExpression.reporter.__typename
    }

    if (data.geneExpression.integratedBy) {
      delete data.geneExpression.integratedBy.__typename
    }

    if (data.geneExpression.fusionType) {
      delete data.geneExpression.fusionType.__typename
    }

    if (data.geneExpression.expressionPattern) {
      delete data.geneExpression.expressionPattern.__typename
    }

    if (data.geneExpression.backboneVector) {
      delete data.geneExpression.backboneVector.__typename
    }

    if (data.geneExpression.observeExpression) {
      delete data.geneExpression.observeExpression.__typename

      keys(data.geneExpression.observeExpression).forEach(key => {
        data.geneExpression.observeExpression[key].forEach(item => {
          delete item.__typename
          if (!item.id) item.id = uuid()

          _.values(item).forEach(entry => {
            delete entry.__typename
            delete entry.id
          })
        })
      })
    }
  }

  const autocompleteKeys = keys(data).filter(key => {
    const match = key.match(/react-autowhatever*/)
    return match !== null
  })

  autocompleteKeys.forEach(key => delete data[key])

  if (data.image) delete data.image.__typename
  if (data.suggestedReviewer) delete data.suggestedReviewer.__typename

  delete data.__typename

  if (data.communicationHistory)
    data.communicationHistory.forEach(item => {
      delete item.__typename
    })

  return data
}
/* eslint-enable no-underscore-dangle, no-param-reassign */

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
