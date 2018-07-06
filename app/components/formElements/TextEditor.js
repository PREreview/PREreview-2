/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'
import { TextEditor as Editor } from 'xpub-edit'

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
`

const Wrapper = styled.div`
  width: 600px;

  div {
    border-color: ${th('colorBorder')};
    border-radius: 5px;
    margin-top: ${th('gridUnit')};

    div[contenteditable='true'] {
      /* height: 100px; */
    }
  }
`

const TextEditor = props => {
  const { label, placeholder } = props
  const value = ''

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Editor placeholder={placeholder} value={value} />
    </Wrapper>
  )
}

export default TextEditor
