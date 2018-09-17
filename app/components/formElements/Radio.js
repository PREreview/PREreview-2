/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get, omit } from 'lodash'

import { RadioGroup as UIRadioGroup } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

// TO DO -- extract Labels from TextField
const Label = styled.label`
  display: block;
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

// applies directly to label
const RadioGroup = styled(UIRadioGroup)`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-right: ${props => (props.inline ? th('gridUnit') : 0)};
  margin-top: ${th('gridUnit')};

  span {
    font-family: ${th('fontInterface')};
    font-size: ${th('fontSizeBaseSmall')};
    font-style: normal;
    letter-spacing: unset;

    &:before {
      margin-left: 1px;
    }
  }

  &:hover {
    span {
      color: currentColor;
    }

    span:before {
      animation: none;
      box-shadow: 0 0 0 1px currentColor;
      color: currentColor;
    }
  }

  input {
    display: none;
  }
`

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: 400px;
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const Radio = props => {
  const {
    className,
    error,
    label,
    name,
    options,
    readOnly,
    required,
    setFieldValue,
    values,
  } = props

  const value = get(values, name)
  const onChange = newValue => setFieldValue(name, newValue)

  const radioProps = omit(props, 'required')

  return (
    <Wrapper className={className}>
      {label && (
        <Label>
          {`${label}${required ? ' *' : ''}`} {error && <Error>{error}</Error>}
        </Label>
      )}
      <RadioGroup
        disabled={readOnly}
        onChange={onChange}
        options={options}
        value={value}
        {...radioProps}
      />
    </Wrapper>
  )
}

export default Radio
