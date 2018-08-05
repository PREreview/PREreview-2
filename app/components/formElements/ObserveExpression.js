/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { cloneDeep, get, remove } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Button, Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import AutoComplete from './AutoComplete'
// import TextField from './TextField'

import { getWBbt, getWBls } from '../../fetch/WBApi'

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
    first,
    handleBlur,
    handleChange,
    label,
    name,
    position,
    values,
  } = props
  // console.log(values, name, values[name])

  const base = `geneExpression.observeExpression[${name}][${position}]`
  const primaryFieldName = `${base}[${name}].value`
  const duringFieldName = `${base}.during.value`
  const subcellFieldName = `${base}.subcellularLocalization.value`
  // console.log(base, values)

  const isEmpty = !(
    values[name].value ||
    values.during.value ||
    values.subcellularLocalization.value
  )

  return (
    <Row>
      <Field
        fetchData={getWBbt}
        handleBlur={handleBlur}
        inline
        label={`${label} expressed in`}
        name={primaryFieldName}
        onChange={handleChange}
        placeholder="Ex. Pharynx"
        value={values[name].value}
      />

      <Field
        fetchData={getWBls}
        handleBlur={handleBlur}
        inline
        label="During"
        name={duringFieldName}
        onChange={handleChange}
        placeholder="Ex. Embryo Ce"
        value={values.during.value}
      />

      <Field
        handleBlur={handleBlur}
        inline
        label="Subcellular localization"
        name={subcellFieldName}
        onChange={handleChange}
        placeholder="Ex. Nucleus"
        value={values.subcellularLocalization.value}
      />

      {first &&
        !isEmpty && (
          <IconButton onClick={addItem} primary>
            <Icon>plus</Icon>
          </IconButton>
        )}

      {!first && (
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
    label,
    handleBlur,
    handleChange,
    name,
    setFieldValue,
    values,
  } = props

  // console.log('here', data, name)
  // console.log(data[name])

  const addItem = () => {
    const vals = cloneDeep(values)

    const toAdd = {
      during: { id: uuid(), value: '' },
      id: uuid(),
      subcellularLocalization: { id: uuid(), value: '' },
    }
    toAdd[name] = { id: uuid(), value: '' }

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
            first={i === 0}
            handleBlur={handleBlur}
            handleChange={handleChange}
            key={row.id}
            label={label}
            name={name}
            position={i}
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
  const { handleBlur, handleChange, setFieldValue, value, values } = props

  return (
    <Wrapper>
      {rows.map(row => (
        <RowArray
          data={value}
          handleBlur={handleBlur}
          handleChange={handleChange}
          key={row.key}
          label={row.label}
          name={row.name}
          setFieldValue={setFieldValue}
          values={get(values, 'geneExpression.observeExpression')}
        />
      ))}
    </Wrapper>
  )
}

const ObserveExpression = props => {
  const { error, name, touched } = props
  const touchedThis = get(touched, name)

  return (
    <div>
      <h4>
        When and where did you observe expression? *
        {touchedThis && error && <Error>{error}</Error>}
      </h4>
      <Inputs {...props} />
    </div>
  )
}

export default ObserveExpression
