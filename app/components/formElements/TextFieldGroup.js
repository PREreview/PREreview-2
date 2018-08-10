/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get, omit, set } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import AutoComplete from './AutoComplete'

import { onAutocompleteChange, onSuggestionSelected } from './helpers'

// const onSuggestionSelected = (event, options, setFieldValue, name) => {
//   const field = name.split('.').slice(0, -1)
//   console.log(options)
//   setFieldValue(`${field}.WBId`, options.suggestion.WBId)
// }

const Field = props => {
  const { data, handleChange, name, setFieldValue, value } = props
  const passProps = omit(props, ['label'])

  return (
    <AutoComplete
      fetchData={data}
      name={name}
      onChange={e => onAutocompleteChange(e, name, setFieldValue, handleChange)}
      onSuggestionSelected={onSuggestionSelected}
      placeholder=""
      value={value}
      {...passProps}
    />
  )
}

// TO DO -- extract Labels from TextField
const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
`

const LineWrapper = styled.div`
  display: flex;
`

const GroupWrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const TextFieldGroup = props => {
  const handleAdd = () => {
    const { maxItems, name, setValues, values } = props
    let data = get(values, name)
    // console.log('data', data)

    if (!data) data = []
    if (data.length >= maxItems) return
    // console.log('pass')

    const newItem = {
      id: uuid(),
      name: '',
    }

    const newValues = data.push(newItem)
    // console.log(newValues, data)
    setValues(values, name, newValues)
  }

  const handleRemove = id => {
    const { name, setValues, values } = props
    const data = get(values, name)

    const changed = data.filter(val => val.id !== id)
    const newValues = set(values, name, changed)
    setValues(newValues)
  }

  const { handleChange, label, name, placeholder, required, values } = props

  let data = get(values, name)
  if (!data || data.length === 0) data = [{ name: '' }]

  const error = get(props.errors, name)
  const touched = get(props.touched, name)

  return (
    <GroupWrapper>
      {label && (
        <Label>
          {label} {required ? ' *' : ''}{' '}
          {touched && error && <Error>{!Array.isArray(error) && error}</Error>}
        </Label>
      )}
      {data &&
        data.length > 0 &&
        data.map((item, i) => {
          const itemName = `${name}[${i}].name`
          const itemValue = data[i].name

          const itemId = data[i].WBId || uuid()

          return (
            <LineWrapper key={itemName}>
              <Field
                {...props}
                error={Array.isArray(error) && error[i] && error[i].name}
                handleChange={handleChange}
                name={itemName}
                placeholder={placeholder}
                value={itemValue}
              />
              <Button onClick={() => handleRemove(itemId)}>Remove</Button>
            </LineWrapper>
          )
        })}

      {(!data || data.length === 0) && (
        <Field
          error={Array.isArray(error) && error[0] && error[0].name}
          handleChange={handleChange}
          name={`${name}[0].name`}
          value={data[0].name}
          {...props}
        />
      )}
      <Button onClick={handleAdd} primary>
        Add another
      </Button>
    </GroupWrapper>
  )
}

export default TextFieldGroup
