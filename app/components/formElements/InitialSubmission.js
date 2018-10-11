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

const disclaimerDescription = (
  <React.Fragment>
    <p>
      By submitting your article to microPublication Biology, you and any
      co-authors agree to the following: I/we declare to the best of my/our
      knowledge that each reported experiment is reproducible; that the
      submission has been approved by all authors; that the submission has been
      approved by the laboratory&#39;s Principal Investigator, and that the
      results have not been published elsewhere by us. As the author(s) I/we
      declare no conflict of interest.
    </p>
  </React.Fragment>
)

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

      <TextField
        error={get(errors, 'title')}
        label="Title"
        name="title"
        placeholder="this is the title"
        required
        value={get(values, 'title')}
        {...props}
      />

      <Image label="Image" name="image" required {...props} />

      <TextEditor
        bold
        error={get(props.errors, 'patternDescription')}
        italic
        key={`pattern-description-${props.readOnly}`}
        label="Main article text"
        name="patternDescription"
        placeholder="Provide a description for the pattern"
        required
        subscript
        superscript
        value={get(values, 'patternDescription')}
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
        error={get(errors, 'suggestedReviewer.name')}
        fetchData={getWBPerson}
        label="Suggested Reviewer"
        name="suggestedReviewer.name"
        onChange={e =>
          onAutocompleteChange(
            e,
            'laboratory.name',
            setFieldValue,
            handleChange,
          )
        }
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Please type in the suggested reviewer"
        value={get(values, 'suggestedReviewer.name')}
        {...props}
      />

      <Checkbox
        checkBoxText="I agree"
        checked={get(values, 'disclaimer')}
        description={disclaimerDescription}
        label="Disclaimer"
        name="disclaimer"
        onChange={handleChange}
        required
        value={get(values, 'disclaimer')}
        {...props}
      />

      <TextEditor
        error={get(props.errors, 'comments')}
        key={`comments-${props.readOnly}`}
        label="Comments to the editor"
        name="comments"
        value={get(values, 'comments')}
        {...props}
      />
    </React.Fragment>
  )
}

export default InitialSubmission
