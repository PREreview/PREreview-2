/* eslint-disable react/prop-types */

import React from 'react'
import { get } from 'lodash'

import { getWBLaboratory, getWBPerson } from '../../fetch/WBApi'

import AutoComplete from './AutoComplete'
import Checkbox from './Checkbox'
import Image from './Image'
import TextEditor from './TextEditor'
import TextField from './TextField'
import TextFieldGroup from './TextFieldGroup'

const authorSuggestionSelected = (event, authorOptions, setFieldValue) => {
  // const { name, onSuggestionSelected, setValues } = this.props

  // if (onSuggestionSelected) onSuggestionSelected(event, authorOptions)
  // formik specific -- cannot stay here if this moves to ui lib
  // if (setFieldValue) setFieldValue(name, authorOptions.suggestionValue)
  // if (setValues) setValues({
  //   'author.name':
  // })
  // console.log(authorOptions)
  // console.log(setFieldValue)
  setFieldValue('author.wbPersonId', authorOptions.suggestion.wbPersonId)
}

const InitialSubmission = props => {
  // console.log(props)
  const { handleChange, values } = props

  return (
    <React.Fragment>
      <AutoComplete
        fetchData={getWBPerson}
        label="Name"
        name="author.name"
        onChange={handleChange}
        onSuggestionSelected={authorSuggestionSelected}
        placeholder="Please type in your name"
        required
        value={get(values, 'author.name')}
        {...props}
      />

      <TextField
        label="Email address"
        name="author.email"
        placeholder="this is the email"
        required
        value={get(values, 'author.email')}
        {...props}
      />

      <TextFieldGroup
        data={getWBPerson}
        handleChange={handleChange}
        label="Co-Authors"
        name="coAuthors"
        placeholder="Please type a co-author's name"
        {...props}
      />

      <AutoComplete
        fetchData={getWBLaboratory}
        label="Laboratory"
        name="laboratory"
        onChange={handleChange}
        placeholder="Please type in the laboratory"
        required
        value={get(values, 'laboratory')}
        {...props}
      />

      <TextField
        label="Funding"
        name="funding"
        placeholder="this is the funding"
        required
        value={get(values, 'funding')}
        {...props}
      />

      <Image label="Image" required />

      <TextEditor
        label="Pattern description"
        placeholder="Provide a description for the pattern"
        required
      />

      <TextField
        label="Title"
        name="title"
        placeholder="this is the title"
        required
        value={get(values, 'title')}
        {...props}
      />

      <TextField
        label="Acknowledgements"
        name="acknowledgements"
        placeholder="this is the acknowledgements"
        value={get(values, 'acknowledgements')}
        {...props}
      />

      <AutoComplete
        fetchData={getWBPerson}
        label="Suggested Reviewer"
        name="suggestedReviewer"
        onChange={handleChange}
        placeholder="this is the suggestedReviewer"
        value={get(values, 'suggestedReviewer')}
        {...props}
      />

      <Checkbox
        checked={get(values, 'disclaimerChecked')}
        label="Disclaimer"
        name="disclaimerChecked"
        onChange={handleChange}
        required
        text="I agree to the terms of publication"
        value={get(values, 'disclaimerChecked')}
        {...props}
      />

      <TextEditor
        label="Comments"
        placeholder="Provide a description for the pattern"
      />
    </React.Fragment>
  )
}

export default InitialSubmission
