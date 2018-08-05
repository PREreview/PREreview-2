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
    WBPerson: '',
  },
  coAuthors: [
    {
      id: uuid(),
      name: '',
    },
  ],
  comments: '',
  dataType: '',
  disclaimer: false,
  funding: '',
  geneExpression: {
    antibodyUsed: '',
    backboneVector: '',
    coinjected: '',
    constructComments: '',
    constructionDetails: '',
    detectionMethod: '',
    dnaSequence: [
      {
        id: uuid(),
        name: '',
      },
    ],
    expressionPattern: '',
    fusionType: '',
    genotype: '',
    injectionConcentration: '',
    inSituDetails: '',
    integratedBy: '',
    observeExpression: {
      certainly: [
        {
          certainly: { id: uuid(), value: '' },
          during: { id: uuid(), value: '' },
          id: uuid(),
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
      not: [
        {
          during: { id: uuid(), value: '' },
          id: uuid(),
          not: { id: uuid(), value: '' },
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
      partially: [
        {
          during: { id: uuid(), value: '' },
          id: uuid(),
          partially: { id: uuid(), value: '' },
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
      possibly: [
        {
          during: { id: uuid(), value: '' },
          id: uuid(),
          possibly: { id: uuid(), value: '' },
          subcellularLocalization: { id: uuid(), value: '' },
        },
      ],
    },
    reporter: '',
    species: '',
    strain: '',
    transgeneName: '',
    transgeneUsed: [
      {
        id: uuid(),
        name: '',
      },
    ],
    utr: '',
    variation: '',
  },
  image: {},
  laboratory: '',
  patternDescription: '<p></p>',
  suggestedReviewer: '',
  title: '',
}

if (process.env.NODE_ENV === 'development') {
  defaultFormValues = {
    acknowledgements: '',
    author: {
      email: 'john@john.com',
      name: 'john',
      WBPerson: '',
    },
    coAuthors: [{ id: uuid(), name: 'Yannus' }, { id: uuid(), name: 'Alexus' }],
    comments: '<p>some comments here</p>',
    dataType: '',
    disclaimer: true,
    funding: 'blah',
    geneExpression: {
      antibodyUsed: 'an antibody',
      backboneVector: '',
      coinjected: '',
      constructComments: '',
      constructionDetails: '',
      detectionMethod: 'antibody',
      dnaSequence: [
        {
          id: uuid(),
          name: '',
        },
      ],
      expressionPattern: 'some expression',
      fusionType: '',
      genotype: '',
      injectionConcentration: '',
      inSituDetails: '',
      integratedBy: '',
      observeExpression: {
        certainly: [
          {
            certainly: { id: uuid(), value: 'some' },
            during: { id: uuid(), value: '' },
            id: uuid(),
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
        not: [
          {
            during: { id: uuid(), value: '' },
            id: uuid(),
            not: { id: uuid(), value: '' },
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
        partially: [
          {
            during: { id: uuid(), value: '' },
            id: uuid(),
            partially: { id: uuid(), value: '' },
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
        possibly: [
          {
            during: { id: uuid(), value: '' },
            id: uuid(),
            possibly: { id: uuid(), value: '' },
            subcellularLocalization: { id: uuid(), value: '' },
          },
        ],
      },
      reporter: '',
      species: 'a species',
      strain: '',
      transgeneName: '',
      transgeneUsed: [
        {
          id: uuid(),
          name: '',
        },
      ],
      utr: '',
      variation: '',
    },
    image: {},
    laboratory: 'lab',
    // patternDescription: '<p>this is it</p>',
    patternDescription: '<p></p>',
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
      if (item.wormBaseId) {
        modAuthor.WBPerson = item.wormBaseId
        delete modAuthor.wormBaseId
      }
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
    modAuthor.wormBaseId = modAuthor.WBPerson
    delete modAuthor.WBPerson
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

  if (data.geneExpression) {
    // eslint-disable-next-line no-underscore-dangle
    delete data.geneExpression.__typename

    if (data.geneExpression.dnaSequence) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      data.geneExpression.dnaSequence.forEach(item => delete item.__typename)
    }

    if (data.geneExpression.transgeneUsed) {
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      data.geneExpression.transgeneUsed.forEach(item => delete item.__typename)
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

          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          _.values(item).forEach(entry => delete entry.__typename)
        })
      })
    }
  }

  // console.log(data.authors)

  // console.log('final', data)
  return data
}

export { dataToFormValues, formValuesToData }
