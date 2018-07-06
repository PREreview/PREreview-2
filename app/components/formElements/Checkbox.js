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

const Checkbox = props => {
  const { label, text } = props

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Check label={text} />
    </Wrapper>
  )
}

export default Checkbox
