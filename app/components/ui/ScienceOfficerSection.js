/* eslint-disable react/prop-types */

import React from 'react'
import { withTheme } from 'styled-components'

import { Accordion, Button } from '@pubsweet/ui'

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

const ScienceOfficerSection = props => {
  const { theme, ...otherProps } = props
  const options = makeOptions(theme)

  return (
    <Accordion label="Science Officer" startExpanded>
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
    </Accordion>
  )
}

export default withTheme(ScienceOfficerSection)
