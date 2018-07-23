/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { get, omit, set } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import AutoComplete from './AutoComplete'

const Field = props => {
  const { data, handleChange, name, value } = props
  const passProps = omit(props, ['label'])

  return (
    <AutoComplete
      fetchData={data}
      name={name}
      onChange={handleChange}
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

class TextFieldGroup extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd() {
    const { maxItems, name, setValues, values } = this.props
    let data = get(values, name)

    if (!data) data = []
    if (data.length >= maxItems) return

    const newItem = {
      id: uuid(),
      name: '',
    }

    const newValues = data.push(newItem)
    setValues(values, name, newValues)
  }

  handleRemove(id) {
    const { name, setValues, values } = this.props
    const data = get(values, name)

    const changed = data.filter(val => val.id !== id)
    const newValues = set(values, name, changed)
    setValues(newValues)
  }

  render() {
    const { handleChange, label, name, placeholder, values } = this.props
    let data = get(values, name)
    if (!data || data.length === 0) data = [{ name: '' }]

    // console.log(data)
    // console.log(data.length > 0)

    return (
      <GroupWrapper>
        {label && <Label>{label}</Label>}
        {data &&
          data.length > 0 &&
          data.map((item, i) => {
            const itemName = `${name}[${i}].name`
            const itemValue = data[i].name
            const itemId = data[i].id || uuid()
            // console.log(itemName)

            return (
              <LineWrapper key={itemId}>
                <Field
                  {...this.props}
                  handleChange={handleChange}
                  name={itemName}
                  placeholder={placeholder}
                  value={itemValue}
                />
                <Button onClick={() => this.handleRemove(itemId)}>
                  Remove
                </Button>
              </LineWrapper>
            )
          })}

        {(!data || data.length === 0) && (
          <Field
            handleChange={handleChange}
            name={`${name}[0].name`}
            value={data[0].name}
            {...this.props}
          />
        )}
        <Button onClick={this.handleAdd} primary>
          Add another
        </Button>
      </GroupWrapper>
    )
  }
}

export default TextFieldGroup
