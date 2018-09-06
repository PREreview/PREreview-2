/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Select } from '../ui'

const options = [
  {
    label: 'Conceptualization',
    value: 'conceptualization',
  },
  {
    label: 'Data curation',
    value: 'dataCuration',
  },
  {
    label: 'Formal analysis',
    value: 'formalAnalysis',
  },
  {
    label: 'Funding acquisition',
    value: 'fundingAcquisition',
  },
  {
    label: 'Investigation',
    value: 'investigation',
  },
  {
    label: 'Methodology',
    value: 'methodology',
  },
  {
    label: 'Project administration',
    value: 'project',
  },
  {
    label: 'Resources',
    value: 'resources',
  },
  {
    label: 'Software',
    value: 'software',
  },
  {
    label: 'Supervision',
    value: 'supervision',
  },
  {
    label: 'Validation',
    value: 'validation',
  },
  {
    label: 'Visualization',
    value: 'visualization',
  },
  {
    label: 'Writing - original draft',
    value: 'writing_originalDraft',
  },
  {
    label: 'Writing - review & editing',
    value: 'writing_reviewEditing',
  },
]

const Credit = props => {
  const { name, readOnly, setTouched, setFieldValue, touched, values } = props

  const currentValues =
    values &&
    values.map(value => options.find(option => option.value === value))

  const handleChange = newValues => {
    const data = newValues.map(item => item.value)
    setFieldValue(name, data)
  }

  const handleBlur = e => {
    if (!touched) setTouched()
  }

  const StyledSelect = styled(Select)`
    max-width: 675px;
  `

  return (
    <StyledSelect
      closeMenuOnSelect={false}
      isDisabled={readOnly}
      isMulti
      onBlur={handleBlur}
      onChange={handleChange}
      options={options}
      value={currentValues}
    />
  )
}

export default Credit
