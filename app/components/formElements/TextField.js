/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { get } from 'lodash'

import { TextField as UiTextField } from '@pubsweet/ui'
import { fadeIn, th } from '@pubsweet/ui-toolkit'

const StyledTextField = styled(UiTextField)`
  line-height: ${th('lineHeightBase')};
  margin-bottom: calc(${th('gridUnit')} * 3);
  width: calc(${th('gridUnit')} * 50);

  input {
    height: calc(${th('gridUnit')} * 4);
  }
`

const Error = styled.div.attrs({
  role: 'alert',
})`
  align-self: flex-end;
  animation: ${fadeIn} 0.2s;
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  margin: 0 0 calc(${th('gridUnit')} * 3) calc(${th('gridUnit')} * 2);
`

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding: 10px 10px 0 0;
`

const Wrapper = styled.div`
  display: flex;

  ${props =>
    props.inline &&
    css`
      /* width: 600px; */
      justify-content: space-between;
    `};
`

const Field = ({
  handleBlur,
  handleChange,
  inline,
  label,
  name,
  required,
  touched,
  value,
  ...props
}) => {
  const error = get(props.errors, name)
  const touchedThis = get(touched, name)

  // console.log(handleBlur)
  // console.log(props)

  const showError = () => {
    // console.log(name, touched)
    if (touchedThis && error) return true
    if (!touchedThis && value && error) return true
    return false
  }

  const validationStatus = () => {
    if (showError()) return 'error'
    return 'default'
  }

  const fieldLabel = label && `${label}${required ? ' *' : ''}`

  return (
    <FieldWithError>
      <StyledTextField
        label={inline ? null : fieldLabel}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        validationStatus={validationStatus()}
        value={value}
        {...props}
      />
      {showError() && <Error>{error}</Error>}
    </FieldWithError>
  )
}

const FieldWithError = styled.div`
  display: inline-flex;
`

const TextField = props => {
  const { inline, label } = props

  return (
    <Wrapper inline={inline}>
      {inline && <Label>{label}</Label>}
      <Field {...props} />
    </Wrapper>
  )
}

export default TextField
