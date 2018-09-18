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

const Message = styled.div`
  color: ${th('colorPrimary')};
  margin-bottom: ${th('gridUnit')};
  text-transform: uppercase;
`

const ReviewerPanel = props => {
  const { loading, reviews, theme, updateReview } = props
  if (loading) return <Loading />

  const options = makeOptions(theme)
  const latestReview = reviews[0] // TO DO -- adjust when there are versions
  const submitted = latestReview && latestReview.status.submitted

  return (
    <div>
      <Header>Review</Header>
      {submitted && <Message>Submitted</Message>}

      <ReviewForm review={latestReview} updateReview={updateReview}>
        {formProps => {
          const { errors, values } = formProps

          return (
            <React.Fragment>
              <Editor
                bold
                error={errors.content}
                italic
                key={submitted}
                label="Review text"
                name="content"
                placeholder="Write your review"
                readOnly={submitted}
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
                readOnly={submitted}
                required
                theme={theme}
                value={values.recommendation}
                {...formProps}
              />

              {!submitted && (
                <Button primary type="submit">
                  Submit
                </Button>
              )}
            </React.Fragment>
          )
        }}
      </ReviewForm>
    </div>
  )
}

export default withTheme(ReviewerPanel)
