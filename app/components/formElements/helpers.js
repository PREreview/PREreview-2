import { v4 as uuid } from 'uuid'

import _, {
  cloneDeep,
  find,
  // merge,
  mergeWith,
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
    conijected: '',
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
  patternDescription: '',
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
      antibodyUsed: '',
      backboneVector: '',
      conijected: '',
      constructComments: '',
      constructionDetails: '',
      detectionMethod: 'newTransgene',
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
            during: { id: uuid(), value: 'la' },
            id: uuid(),
            possibly: { id: uuid(), value: 'lu' },
            subcellularLocalization: { id: uuid(), value: 'lee' },
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
    laboratory: 'lab',
    patternDescription: '<p>this is it</p>',
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
  const { author, coAuthors, status } = data

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

  // console.log(data.authors)

  // console.log('final', data)
  return data
}

export { dataToFormValues, formValuesToData }
