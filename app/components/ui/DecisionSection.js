/* eslint-disable react/prop-types */

import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { Radio } from '../formElements'
import { DecisionForm } from '../form'
import { Accordion, PanelTextEditor as Editor } from './index'
import { hasDecision } from '../../helpers/status'

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
  cursor: default;
  margin-bottom: calc(${th('gridUnit')} * 2);
  margin-left: calc(${th('gridUnit')} * 3);
`

const Message = styled.div`
  color: ${th('colorPrimary')};
  text-transform: uppercase;
`

const DecisionSection = props => {
  const { article, theme, ...otherProps } = props
  const options = makeOptions(theme)
  const { status } = article
  const decisionExists = hasDecision(status)

  return (
    <Accordion label="Decision" startExpanded={decisionExists}>
      <FormWrapper>
        <DecisionForm article={article} {...otherProps}>
          {formProps => {
            const { values } = formProps

            return (
              <React.Fragment>
                {decisionExists && <Message>Decision submitted</Message>}

                <Radio
                  inline
                  name="decision"
                  options={options}
                  readOnly={decisionExists}
                  {...formProps}
                />

                <Editor
                  key={decisionExists}
                  label="Decision letter"
                  name="decisionLetter"
                  placeholder="Make some comments to the author"
                  readOnly={decisionExists}
                  value={values.decisionLetter}
                  {...formProps}
                />

                {!decisionExists && (
                  <Button primary type="submit">
                    Send to Author
                  </Button>
                )}
              </React.Fragment>
            )
          }}
        </DecisionForm>
      </FormWrapper>
    </Accordion>
  )
}

export default withTheme(DecisionSection)
