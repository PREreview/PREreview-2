/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get, omit } from 'lodash'

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

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const Radio = props => {
  const { error, label, name, options, required, setFieldValue, values } = props
  // console.log(error)

  const value = get(values, name)
  const onChange = newValue => setFieldValue(name, newValue)

  const radioProps = omit(props, 'required')

  return (
    <Wrapper>
      {label && (
        <Label>
          {`${label}${required ? ' *' : ''}`} {error && <Error>{error}</Error>}
        </Label>
      )}
      <RadioGroup
        onChange={onChange}
        options={options}
        value={value}
        {...radioProps}
      />
    </Wrapper>
  )
}

export default Radio
