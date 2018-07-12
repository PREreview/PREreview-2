/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import { RadioGroup } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
`

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: 400px;

  div {
    margin-top: ${th('gridUnit')};

    label {
      input {
        position: unset;
      }

      span {
        font-family: ${th('fontInterface')};
        font-size: ${th('fontSizeBaseSmall')};
        font-style: normal;
        letter-spacing: unset;
      }
    }
  }
`

const Radio = props => {
  const { label, name, options, required, setFieldValue, values } = props

  const value = get(values, name)
  const onChange = newValue => setFieldValue(name, newValue)

  return (
    <Wrapper>
      {label && <Label>{`${label}${required ? ' *' : ''}`}</Label>}
      <RadioGroup
        onChange={onChange}
        options={options}
        value={value}
        {...props}
      />
    </Wrapper>
  )
}

export default Radio
