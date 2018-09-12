/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { get } from 'lodash'

import { th } from '@pubsweet/ui-toolkit'
import { AbstractEditor } from 'xpub-edit'

// TO DO -- extract Labels from TextField
const Label = styled.label`
  display: block;
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const readOnlyStyles = css`
  background: ${th('colorBackgroundHue')};
  cursor: not-allowed;
`

const Editor = styled(AbstractEditor)`
  ${props => props.readonly && readOnlyStyles};

  div[contenteditable] {
    border-color: ${th('colorBorder')};
    border-radius: ${th('borderRadius')};
    margin-top: ${th('gridUnit')};
  }
`

const Wrapper = styled.div`
  width: 600px;
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const TextEditor = props => {
  const {
    className,
    error,
    label,
    name,
    placeholder,
    readOnly,
    required,
    setFieldValue,
    italic,
    value,
    bold,
    heading,
    smallcaps,
    subscript,
    superscript,
  } = props

  const handleChange = newValue => {
    setFieldValue(name, newValue)
  }

  const handleBlur = e => {
    props.setFieldTouched(name, true)
  }

  const touchedThis = get(props.touched, name)

  return (
    <Wrapper className={className}>
      {label && (
        <Label>
          {`${label}${required ? ' *' : ''}`}{' '}
          {touchedThis && error && <Error>{error}</Error>}
        </Label>
      )}
      <Editor
        bold={bold || false}
        heading={heading || false}
        italic={italic || false}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        readonly={readOnly}
        {...props}
        smallcaps={smallcaps || false}
        subscript={subscript || false}
        superscript={superscript || false}
        value={value || ''}
      />
    </Wrapper>
  )
}

export default TextEditor
