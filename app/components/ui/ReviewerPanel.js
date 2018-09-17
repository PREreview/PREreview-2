/* eslint-disable react/prop-types */

import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Button, H2 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { ReviewForm } from '../form'
import { Radio as UIRadio, TextEditor } from '../formElements'
import Loading from '../Loading'

const makeOptions = theme => [
  {
    color: theme.colorSuccess,
    label: 'Accept',
    value: 'accept',
  },
  {
    color: theme.colorWarning,
    label: 'Revise',
    value: 'revise',
  },
  {
    color: theme.colorError,
    label: 'Reject',
    value: 'reject',
  },
]

const Editor = styled(TextEditor)`
  min-height: 50vh;
  width: 100%;
`

const Header = styled(H2)`
  color: ${th('colorText')};
`

const Radio = styled(UIRadio)`
  width: 100%;

  label {
    width: unset;
  }
`

const ReviewerPanel = props => {
  const { loading, reviews, theme, updateReview } = props
  if (loading) return <Loading />

  const options = makeOptions(theme)
  const latestReview = reviews[0] // TO DO -- adjust when there are versions

  return (
    <div>
      <Header>Review</Header>

      <ReviewForm review={latestReview} updateReview={updateReview}>
        {formProps => {
          const { errors, values } = formProps
          console.log(errors)

          return (
            <React.Fragment>
              <Editor
                bold
                error={errors.content}
                italic
                label="Review text"
                name="content"
                placeholder="Write your review"
                required
                subscript
                superscript
                value={values.content}
                {...formProps}
              />

              <Radio
                error={errors.recommendation}
                inline
                label="Recommendation to the Editors"
                name="recommendation"
                options={options}
                required
                theme={theme}
                value={values.recommendation}
                {...formProps}
              />

              <Button primary type="submit">
                Submit
              </Button>
            </React.Fragment>
          )
        }}
      </ReviewForm>
    </div>
  )
}

export default withTheme(ReviewerPanel)
