/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
// import { get } from 'lodash'

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

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const TextEditor = props => {
  const {
    error,
    label,
    name,
    placeholder,
    required,
    setFieldValue,
    value,
  } = props
  // const value = ''

  const handleChange = newValue => {
    setFieldValue(name, newValue)
  }

  // const handleFocus = e => {
  //   console.log('focus')
  // }

  // const touchedThis = get(props.touched, name)
  // console.log(touchedThis)

  return (
    <Wrapper>
      {label && (
        <Label>
          {`${label}${required ? ' *' : ''}`} {error && <Error>{error}</Error>}
        </Label>
      )}
      <Editor
        onChange={handleChange}
        // onFocus={handleFocus}
        placeholder={placeholder}
        value={value || ''}
      />
    </Wrapper>
  )
}

export default TextEditor
