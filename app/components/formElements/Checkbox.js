/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Checkbox as UICheckBox } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

// TO DO -- extract Labels from TextField
const Label = styled.label`
  display: block;
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  /* text-transform: uppercase; */
`

const Check = styled(UICheckBox)`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};

  input {
    display: none;
    margin: 0;
    position: unset;
  }

  span {
    cursor: pointer;
    font-family: ${th('fontInterface')};
    font-size: ${th('fontSizeBaseSmall')};
    font-style: normal;
    letter-spacing: unset;
    transition: none;

    &:before {
      margin-left: 1px;
    }

    &:hover {
      color: ${th('colorText')};
    }

    &:hover:before {
      animation: none;
      background: ${props => {
        if (props.disabled) return 'currentColor'
        if (props.checked) return th('colorPrimary')
        return 'transparent'
      }};
      box-shadow: ${props =>
        props.disabled
          ? '0 0 0 1px currentColor'
          : `0 0 0 1px ${th('colorPrimary')}`};
    }
  }
`

const Description = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  max-width: 600px;
  text-align: justify;
  /* text-transform: uppercase; */

  > p {
    /* margin-bottom: 0; */
    margin: ${th('gridUnit')} 0 0 0;
  }
`

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: 100%;

  label:last-of-type {
    margin-top: ${th('gridUnit')};
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
    checkBoxText,
    checked,
    className,
    description,
    errors,
    label,
    name,
    onBlur,
    onChange,
    readOnly,
    required,
    value,
  } = props
  const error = typeof value !== 'undefined' && errors && errors[name]

  return (
    <Wrapper>
      {label && <Label>{`${label}${required && ' *'}`}</Label>}

      {description && <Description>{description}</Description>}

      <BoxWithError>
        <Check
          checked={checked}
          className={className}
          disabled={readOnly}
          label={checkBoxText}
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
