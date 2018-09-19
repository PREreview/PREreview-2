/* eslint-disable react/prop-types */

import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import Accordion from './Accordion'
import { ScienceOfficerApprovalForm } from '../form'
import { Radio } from '../formElements'

const makeOptions = theme => [
  {
    color: theme.colorSuccess,
    label: 'Approve',
    value: 'true',
  },
  {
    color: theme.colorError,
    label: 'Do not approve',
    value: 'false',
  },
]

const FormWrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  margin-left: calc(${th('gridUnit')} * 3);
`

const ScienceOfficerSection = props => {
  const { theme, ...otherProps } = props
  const options = makeOptions(theme)

  return (
    <Accordion label="Science Officer">
      <FormWrapper>
        <ScienceOfficerApprovalForm {...otherProps}>
          {formProps => (
            <React.Fragment>
              <Radio inline name="approve" options={options} {...formProps} />
              <Button primary type="submit">
                Submit
              </Button>
            </React.Fragment>
          )}
        </ScienceOfficerApprovalForm>
      </FormWrapper>
    </Accordion>
  )
}

export default withTheme(ScienceOfficerSection)
