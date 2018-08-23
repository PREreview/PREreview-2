/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

import Select from '../ui/Select'

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: 400px;

  label {
    margin-bottom: calc(${th('gridUnit')});
  }

  div[role='listbox'] {
    div {
      div {
        margin-bottom: ${th('gridUnit')};
      }
    }
  }
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  /* display: block; */
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const Dropdown = props => {
  const {
    error,
    label,
    name,
    options,
    required,
    setFieldValue,
    touched,
    value,
  } = props

  // console.log(error)
  // console.log(props)

  const onChange = newValue => setFieldValue(name, newValue.value)

  return (
    <Wrapper>
      {label && (
        <Label>
          {label}
          {required && ' *'}
          {touched && error && <Error>{error}</Error>}
        </Label>
      )}
      <Select onChange={onChange} options={options} value={value} />
    </Wrapper>
  )
}

export default Dropdown
