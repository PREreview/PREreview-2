/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Checkbox as Check } from '@pubsweet/ui'
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

  label:last-of-type {
    margin-top: ${th('gridUnit')};

    input {
      margin: 0;
      position: unset;
    }

    span {
      font-family: ${th('fontInterface')};
      font-size: ${th('fontSizeBaseSmall')};
      font-style: normal;
      letter-spacing: unset;
    }
  }
`

const BoxWithError = styled.div`
  display: flex;
  justify-content: column;
`

const Error = styled.div`
  align-self: flex-end;
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  margin-left: ${th('gridUnit')};
`

const Checkbox = props => {
  const {
    checked,
    errors,
    label,
    name,
    onBlur,
    onChange,
    required,
    value,
    text,
  } = props
  const error = typeof value !== 'undefined' && errors[name]

  return (
    <Wrapper>
      {label && <Label>{`${label}${required && ' *'}`}</Label>}

      <BoxWithError>
        <Check
          checked={checked}
          label={text}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        />
        {error && <Error>{error}</Error>}
      </BoxWithError>
    </Wrapper>
  )
}

export default Checkbox
