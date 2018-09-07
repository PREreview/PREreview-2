/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get, isEmpty, keys, omit, set } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { AuthorInput, AutoComplete } from './index'

import { onAutocompleteChange, onSuggestionSelected } from './helpers'

const Field = props => {
  const {
    authors,
    data,
    handleChange,
    name,
    placeholder,
    setFieldValue,
    value,
  } = props
  const passProps = omit(props, ['label'])

  if (authors) {
    return (
      <AuthorInput
        name={name}
        placeholder={placeholder}
        values={value}
        {...passProps}
      />
    )
  }

  return (
    <AutoComplete
      fetchData={data}
      name={name}
      onChange={e => onAutocompleteChange(e, name, setFieldValue, handleChange)}
      onSuggestionSelected={onSuggestionSelected}
      placeholder={placeholder}
      value={value}
      {...passProps}
    />
  )
}

// TO DO -- extract Labels from TextField
const Label = styled.label`
  display: block;
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const LineWrapper = styled.div`
  display: flex;
`

const StyledButton = styled(Button)`
  margin-top: calc(${th('gridUnit')});
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
    const { authors, maxItems, name, setValues, values } = props
    let data = get(values, name)
    // console.log('data', data)

    if (!data) data = []
    if (data.length >= maxItems) return
    // console.log('pass')

    const newItem = {
      id: uuid(),
      name: '',
    }
    if (authors) newItem.credit = ''

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

  const {
    authors,
    handleChange,
    label,
    name,
    placeholder,
    readOnly,
    required,
    values,
  } = props

  let data = get(values, name)
  if (!data || data.length === 0) {
    data = [{ name: '' }]
    if (authors) data[0].credit = ''
  }

  const error = get(props.errors, name)
  const touched = get(props.touched, name)

  let err
  if (Array.isArray(error)) {
    const firstErr = error.find(e => !isEmpty(e))
    const firstKey = keys(firstErr) && keys(firstErr)[0]
    err = firstErr && firstErr[firstKey]
  } else {
    err = error
  }

  return (
    <GroupWrapper>
      {label && (
        <Label>
          {label} {required ? ' *' : ''}{' '}
          {touched && error && <Error>{err}</Error>}
        </Label>
      )}
      {data &&
        data.length > 0 &&
        data.map((item, i) => {
          const itemName = authors ? `${name}[${i}]` : `${name}[${i}].name`
          const itemValue = authors ? data[i] : data[i].name
          const itemId = data[i].id

          return (
            <LineWrapper key={itemName}>
              <Field
                {...props}
                authors={authors}
                error={Array.isArray(error) && error[i] && error[i].name}
                handleChange={handleChange}
                name={itemName}
                placeholder={placeholder}
                value={itemValue}
              />
              {!readOnly && (
                <Button onClick={() => handleRemove(itemId)}>Remove</Button>
              )}
            </LineWrapper>
          )
        })}

      {(!data || data.length === 0) && (
        <Field
          authors={authors}
          error={Array.isArray(error) && error[0] && error[0].name}
          handleChange={handleChange}
          name={authors ? `${name}[0]` : `${name}[0].name`}
          value={authors ? data[0] : data[0].name}
          {...props}
        />
      )}
      {!readOnly && (
        <StyledButton onClick={handleAdd} primary>
          Add another
        </StyledButton>
      )}
    </GroupWrapper>
  )
}

export default TextFieldGroup
