/* eslint-disable react/prop-types */

import React from 'react'
import { get } from 'lodash'

import { getWBLaboratory, getWBPerson } from '../../fetch/WBApi'

import { onAutocompleteChange, onSuggestionSelected } from './helpers'

import { AuthorInput } from './index'
import AutoComplete from './AutoComplete'
import Checkbox from './Checkbox'
import Image from './Image'
import TextEditor from './TextEditor'
import TextField from './TextField'
import TextFieldGroup from './TextFieldGroup'

const InitialSubmission = props => {
  const { errors, handleChange, setFieldValue, values } = props

  return (
    <React.Fragment>
      <AuthorInput
        label="Name"
        name="author"
        placeholder="Please type in your name"
        required
        {...props}
      />

      <TextField
        error={get(errors, 'author.email')}
        label="Email address"
        name="author.email"
        placeholder="this is the email"
        required
        value={get(values, 'author.email')}
        {...props}
      />

      <TextFieldGroup
        authors
        data={getWBPerson}
        handleChange={handleChange}
        label="Co-Authors"
        name="coAuthors"
        placeholder="Please type a co-author's name"
        {...props}
      />

      <AutoComplete
        error={get(errors, 'laboratory.name')}
        fetchData={getWBLaboratory}
        label="Laboratory"
        name="laboratory.name"
        onChange={e =>
          onAutocompleteChange(
            e,
            'laboratory.name',
            setFieldValue,
            handleChange,
          )
        }
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Please type in the laboratory"
        required
        value={get(values, 'laboratory.name')}
        {...props}
      />

      <TextField
        error={get(errors, 'funding')}
        label="Funding"
        name="funding"
        placeholder="this is the funding"
        required
        value={get(values, 'funding')}
        {...props}
      />

      <Image label="Image" name="image" required {...props} />

      <TextEditor
        error={get(props.errors, 'patternDescription')}
        key={`pattern-description-${props.readOnly}`}
        label="Pattern description"
        name="patternDescription"
        placeholder="Provide a description for the pattern"
        required
        value={get(values, 'patternDescription')}
        {...props}
      />

      <TextField
        error={get(errors, 'title')}
        label="Title"
        name="title"
        placeholder="this is the title"
        required
        value={get(values, 'title')}
        {...props}
      />

      <TextField
        error={get(errors, 'acknowledgements')}
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
        checked={get(values, 'disclaimer')}
        label="Disclaimer"
        name="disclaimer"
        onChange={handleChange}
        required
        text="I agree to the terms of publication"
        value={get(values, 'disclaimer')}
        {...props}
      />

      <TextEditor
        error={get(props.errors, 'comments')}
        key={`comments-${props.readOnly}`}
        label="Comments"
        name="comments"
        placeholder="Provide a description for the pattern"
        value={get(values, 'comments')}
        {...props}
      />
    </React.Fragment>
  )
}

export default InitialSubmission
