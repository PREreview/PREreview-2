import { cloneDeep, merge, pickBy, omitBy } from 'lodash'

const defaultFormValues = {
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

const dataToFormValues = data => {
  const values = cloneDeep(data)
  const { authors } = data

  if (authors) {
    const author = pickBy(authors, entry => entry.submittingAuthor)
    values.authors = omitBy(values.authors, entry => entry.submittingAuthor)
    values.author = author

    values.coAuthors = authors
  }

  delete values.authors

  // console.log(merge(values, defaultFormValues))
  // throw kjdfjsldjkj
  return merge(values, defaultFormValues)
}

const formValuesToData = values => {
  const data = cloneDeep(values)
  const { author, coAuthors } = data

  if (author) {
    author.submittingAuthor = true
    if (coAuthors) {
      coAuthors.push(author)
      data.authors = coAuthors
    }

    delete data.author
    delete data.coAuthors
  }

  return data
}

export { dataToFormValues, formValuesToData }
