/* eslint-disable react/prop-types */

import React from 'react'
import { withTheme } from 'styled-components'

import { Accordion, Button } from '@pubsweet/ui'

import { Radio } from '../formElements'
import { DecisionForm } from '../form'
import { PanelTextEditor as Editor } from './index'

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

const DecisionSection = props => {
  const { theme, ...otherProps } = props
  const options = makeOptions(theme)

  return (
    <Accordion label="Decision" startExpanded>
      <DecisionForm {...otherProps}>
        {formProps => {
          const { values } = formProps

          return (
            <React.Fragment>
              <Radio inline name="decision" options={options} {...formProps} />
              <Editor
                label="Decision letter"
                name="decisionLetter"
                placeholder="Make some comments to the author"
                value={values.decisionLetter}
                {...formProps}
              />
              <Button primary type="submit">
                Send to Author
              </Button>
            </React.Fragment>
          )
        }}
      </DecisionForm>
    </Accordion>
  )
}

export default withTheme(DecisionSection)
