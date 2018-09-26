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

const Header = styled.div`
  font-weight: bold;
  margin-top: ${th('gridUnit')};
`

const ScienceOfficerSection = props => {
  const { editorSuggestedReviewers, theme, ...otherProps } = props
  const options = makeOptions(theme)

  return (
    <Accordion label="Science Officer" startExpanded>
      <FormWrapper>
        <Header>Reviewers suggested by Editor</Header>
        <div>
          {editorSuggestedReviewers.map(
            (reviewer, i) =>
              `${reviewer.username}${
                i === editorSuggestedReviewers.length - 1 ? '' : ', '
              }`,
          )}
        </div>

        <ScienceOfficerApprovalForm {...otherProps}>
          {formProps => (
            <React.Fragment>
              <Header>Approval</Header>
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
