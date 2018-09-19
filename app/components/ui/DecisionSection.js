/* eslint-disable react/prop-types */

import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { Radio } from '../formElements'
import { DecisionForm } from '../form'
import { Accordion, PanelTextEditor as Editor } from './index'

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

const FormWrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  margin-left: calc(${th('gridUnit')} * 3);
`

const DecisionSection = props => {
  const { theme, ...otherProps } = props
  const options = makeOptions(theme)

  return (
    <Accordion label="Decision">
      <FormWrapper>
        <DecisionForm {...otherProps}>
          {formProps => {
            const { values } = formProps

            return (
              <React.Fragment>
                <Radio
                  inline
                  name="decision"
                  options={options}
                  {...formProps}
                />
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
      </FormWrapper>
    </Accordion>
  )
}

export default withTheme(DecisionSection)
