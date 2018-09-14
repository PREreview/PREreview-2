/* eslint-disable react/prop-types */

import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Button, H2 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { ReviewForm } from '../form'
import { Radio, TextEditor } from '../formElements'

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

const RecommendationLabel = styled.div`
  font-weight: bold;
`

const Recommend = props => {
  const { theme, value } = props
  const options = makeOptions(theme)

  return (
    <React.Fragment>
      <RecommendationLabel>Recommendation to the Editors</RecommendationLabel>
      <Radio
        inline
        name="recommendation"
        options={options}
        value={value}
        {...props}
      />
    </React.Fragment>
  )
}

const ReviewerPanel = props => {
  const { theme } = props

  return (
    <div>
      <Header>Review</Header>

      <ReviewForm>
        {formProps => {
          const { values } = formProps

          return (
            <React.Fragment>
              <Editor
                bold
                italic
                name="review"
                placeholder="Write your review"
                subscript
                superscript
                value={values.review}
                {...formProps}
              />

              <Recommend
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
