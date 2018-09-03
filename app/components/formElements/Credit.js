/* eslint-disable react/prop-types */

import React from 'react'

import Select from '../ui/Select'

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
  const { name, setFieldValue, value } = props
  const currentValue = options.find(o => o.value === value)

  const handleChange = newValue => setFieldValue(name, newValue.value)

  return (
    <Select onChange={handleChange} options={options} value={currentValue} />
  )
}

export default Credit
