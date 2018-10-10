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
  border-color: ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  font-family: ${th('fontInterface')};
  padding: ${th('gridUnit')} calc(${th('gridUnit')} / 2);

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props => props.readonly && readOnlyStyles};
`

const menuBorder = css`
  border: 1px solid ${th('colorBorder')};
  border-bottom: 0;
`

const menuStyles = css`
  font-size: ${th('fontSizeBaseSmall')};
  margin: ${th('gridUnit')} 0 0 0;

  ${props => !props.readOnly && menuBorder};
`

const Wrapper = styled.div`
  width: 600px;

  > div > div:first-child {
    margin: ${th('gridUnit')} 0 0 0;

    ${props => props.bold && menuStyles};
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
    <Wrapper className={className} {...props}>
      {label && (
        <Label>
          {`${label}${required ? ' *' : ''}`}{' '}
          {touchedThis && error && <Error>{error}</Error>}
        </Label>
      )}

      <Editor
        bold={bold || false}
        className={className}
        debounceDelay={0}
        heading={heading || false}
        italic={italic || false}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        readonly={readOnly}
        // {...props}
        smallcaps={smallcaps || false}
        subscript={subscript || false}
        superscript={superscript || false}
        value={value || ''}
      />
    </Wrapper>
  )
}

export default TextEditor
