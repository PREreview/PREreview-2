/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { cloneDeep, get, keys, remove } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Button, Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import AutoComplete from './AutoComplete'
// import TextField from './TextField'

import { onAutocompleteChange, onSuggestionSelected } from './helpers'
import { getGOcc, getWBbt, getWBls } from '../../fetch/WBApi'

const rows = [
  {
    key: 'row-array-certainly',
    label: 'Certainly',
    name: 'certainly',
  },
  {
    key: 'row-array-partially',
    label: 'Partially',
    name: 'partially',
  },
  {
    key: 'row-array-possibly',
    label: 'Possibly',
    name: 'possibly',
  },
  {
    key: 'row-array-not',
    label: 'Not',
    name: 'not',
  },
]

const Field = styled(AutoComplete)`
  /* background: pink; */
  /* flex-basis: 450px; */
  justify-content: flex-start;
  display: flex;

  height: calc(${th('gridUnit')} * 4);
  padding: 0 ${th('gridUnit')};
  width: unset;

  /* label {
    background: pink;
  } */

  /* div {
    div {
      div {
        width: 100%;

        input {
          width: 100%;
        }
      }
    }
  } */
`

const Row = styled.div`
  /* background: orange; */
  /* border: 1px dashed yellow; */
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  /* height: 50px; */
  padding: ${th('gridUnit')};

  div > div[role='combobox'] > div[role='listbox'] {
    /* background: teal; */
    left: 63px;
    width: 190px;
  }

  div:first-child > div[role='combobox'] > div[role='listbox'] {
    left: 155px;
  }

  div:last-of-type > div[role='combobox'] > div[role='listbox'] {
    left: 175px;
  }

  div:first-child > div > div {
    label {
      width: 140px;
    }
  }

  div:last-of-type > div > div {
    label {
      width: 160px;
    }
  }
`

const IconButton = styled(Button)`
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: calc(${th('gridUnit')} * 4);
  justify-content: center;
  margin: 0 calc(${th('gridUnit')} / 2);
  min-width: unset;
  padding: 0;
  width: calc(${th('gridUnit')} * 4);

  &:active,
  &:focus {
    outline: none;
  }

  span {
    height: calc(${th('gridUnit')} * 3);
    padding: 0;
  }

  ${props =>
    props.primary &&
    css`
      svg {
        stroke: ${th('colorTextReverse')};
      }
    `};

  ${props =>
    !props.primary &&
    css`
      &:hover {
        background: ${th('colorFurniture')};
      }
    `};
`

const RowWithControls = props => {
  const {
    addItem,
    dataId,
    deleteItem,
    error,
    first,
    handleBlur,
    handleChange,
    label,
    name,
    position,
    readOnly,
    setFieldValue,
    touched,
    values,
  } = props
  // console.log('these', props)
  // console.log(values, name, values[name])

  const base = `geneExpression.observeExpression[${name}][${position}]`
  const primaryFieldName = `${base}[${name}].name`
  const duringFieldName = `${base}.during.name`
  const subcellFieldName = `${base}.subcellularLocalization.name`
  // console.log(base, values)

  const isEmpty = !(
    values[name].name ||
    values.during.name ||
    values.subcellularLocalization.name
  )

  return (
    <Row>
      <Field
        error={error && error[name] && error[name].name}
        fetchData={getWBbt}
        handleBlur={handleBlur}
        hideErrorMessage
        inline
        label={`${label} expressed in`}
        name={primaryFieldName}
        onChange={e => {
          onAutocompleteChange(e, primaryFieldName, setFieldValue, handleChange)
        }}
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Ex. Pharynx"
        readOnly={readOnly}
        setFieldValue={setFieldValue}
        touched={touched}
        value={values[name].name}
      />

      <Field
        error={error && error.during && error.during.name}
        fetchData={getWBls}
        handleBlur={handleBlur}
        hideErrorMessage
        inline
        label="During"
        name={duringFieldName}
        onChange={e => {
          onAutocompleteChange(e, duringFieldName, setFieldValue, handleChange)
        }}
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Ex. Embryo Ce"
        readOnly={readOnly}
        setFieldValue={setFieldValue}
        touched={touched}
        value={values.during.name}
      />

      <Field
        error={
          error &&
          error.subcellularLocalization &&
          error.subcellularLocalization.name
        }
        fetchData={getGOcc}
        handleBlur={handleBlur}
        hideErrorMessage
        inline
        label="Subcellular localization"
        name={subcellFieldName}
        onChange={e => {
          onAutocompleteChange(e, subcellFieldName, setFieldValue, handleChange)
        }}
        onSuggestionSelected={onSuggestionSelected}
        placeholder="Ex. Nucleus"
        readOnly={readOnly}
        setFieldValue={setFieldValue}
        touched={touched}
        value={values.subcellularLocalization.name}
      />

      {!readOnly &&
        first &&
        !isEmpty && (
          <IconButton onClick={addItem} primary>
            <Icon>plus</Icon>
          </IconButton>
        )}

      {!readOnly &&
        !first && (
          <IconButton onClick={() => deleteItem(dataId)}>
            <Icon>minus</Icon>
          </IconButton>
        )}
    </Row>
  )
}

const RowArray = props => {
  const {
    data,
    error,
    label,
    handleBlur,
    handleChange,
    name,
    readOnly,
    setFieldValue,
    touched,
    values,
  } = props

  // console.log('here', data, name)
  // console.log(data[name])

  const addItem = () => {
    const vals = cloneDeep(values)

    const toAdd = {
      during: { name: '', WBId: '' },
      id: uuid(),
      subcellularLocalization: { name: '', WBId: '' },
    }
    toAdd[name] = { name: '', WBId: '' }

    vals[name].push(toAdd)
    setFieldValue('geneExpression.observeExpression', vals)
  }

  const deleteItem = id => {
    const vals = cloneDeep(values)
    remove(vals[name], item => item.id === id)
    setFieldValue('geneExpression.observeExpression', vals)
  }

  return (
    <React.Fragment>
      {data &&
        data[name] &&
        data[name].map((row, i) => (
          <RowWithControls
            addItem={addItem}
            dataId={row.id}
            deleteItem={deleteItem}
            error={error && error[name] && error[name][i]}
            first={i === 0}
            handleBlur={handleBlur}
            handleChange={handleChange}
            key={row.id}
            label={label}
            name={name}
            position={i}
            readOnly={readOnly}
            setFieldValue={setFieldValue}
            touched={touched}
            values={data[name][i]}
          />
        ))}
    </React.Fragment>
  )
}

const Wrapper = styled.div`
  /* background: blue; */
  display: flex;
  flex-direction: column;
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: normal;
  line-height: ${th('lineHeightBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const Inputs = props => {
  const {
    error,
    handleBlur,
    handleChange,
    readOnly,
    setFieldValue,
    touched,
    value,
    values,
  } = props

  return (
    <Wrapper>
      {rows.map(row => (
        <RowArray
          data={value}
          error={error}
          handleBlur={handleBlur}
          handleChange={handleChange}
          key={row.key}
          label={row.label}
          name={row.name}
          readOnly={readOnly}
          setFieldValue={setFieldValue}
          touched={touched}
          values={get(values, 'geneExpression.observeExpression')}
        />
      ))}
    </Wrapper>
  )
}

const ObserveExpression = props => {
  const { error, name, touched } = props
  const touchedThis = get(touched, name)

  const handleError = err => {
    if (typeof error === 'string') return err

    let arr = []
    keys(err).forEach(key => (arr = arr.concat(err[key])))

    let result

    arr.find(row => {
      if (keys(row).length > 0) {
        const item = row[keys(row)[0]]

        if (keys(item).length > 0) {
          if (item[keys(item)]) {
            return (result = item[keys(item)[0]])
          }
        }
      }
      return false
    })

    if (result) return result
    return null
  }

  return (
    <div>
      <h4>
        When and where did you observe expression? *
        {touchedThis && error && <Error>{handleError(error)}</Error>}
      </h4>
      <Inputs {...props} />
    </div>
  )
}

export default ObserveExpression
