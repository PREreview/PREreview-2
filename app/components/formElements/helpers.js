import { v4 as uuid } from 'uuid'

import {
  cloneDeep,
  find,
  merge,
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
  coAuthors: [],
  comments: '',
  disclaimer: false,
  funding: '',
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
    disclaimer: true,
    funding: 'blah',
    image: {},
    laboratory: 'lab',
    patternDescription: '<p>this is it</p>',
    suggestedReviewer: '',
    title: 'titlez',
  }
}

const dataToFormValues = data => {
  const values = cloneDeep(data)
  const { authors, image } = data

  // console.log(data)

  if (authors) {
    const modAuthors = authors.map(item => {
      const modAuthor = cloneDeep(item)
      if (item.wormBaseId) {
        modAuthor.WBPerson = item.wormBaseId
        delete modAuthor.wormBaseId
      }
      modAuthor.id = uuid()
      return omit(modAuthor, '__typename') // eslint-disable-line no-underscore-dangle
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
  return merge(defaultFormValues, values)
}

const formValuesToData = values => {
  const data = cloneDeep(values)
  const { author, coAuthors } = data

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

  delete data.author
  delete data.coAuthors

  // console.log('final', data)
  return data
}

export { dataToFormValues, formValuesToData }
