/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { cloneDeep, get, remove } from 'lodash'
import { v4 as uuid } from 'uuid'

import { Button, Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import TextField from './TextField'

const rows = [
  {
    label: 'Certainly',
    name: 'certainly',
  },
  {
    label: 'Partially',
    name: 'partially',
  },
  {
    label: 'Possibly',
    name: 'possibly',
  },
  {
    label: 'Not',
    name: 'not',
  },
]

const Field = styled(TextField)`
  justify-content: flex-start;
  /* background: pink; */
  display: flex;
  /* flex-basis: 450px; */
  height: calc(${th('gridUnit')} * 4);
  padding: 0 ${th('gridUnit')};
  width: unset;

  div {
    /* flex-grow: 1; */
    /* flex-basis: 300px; */

    div {
      width: 100%;

      input {
        width: 100%;
      }
    }
  }
`

const Row = styled.div`
  /* background: orange; */
  /* border: 1px dashed yellow; */
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 50px;
  padding: ${th('gridUnit')};

  /* stylelint-disable-next-line no-descending-specificity */
  div {
    label {
      flex-basis: 10%;
      /* flex-shrink: 0; */
      flex-grow: 1;
    }
  }

  div:first-child {
    label {
      /* flex-basis: 150px; */
      width: 140px;
    }
  }

  div:last-child {
    label {
      flex-basis: 40%;
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

  return (
    <React.Fragment>
      <Row>
        <Field
          handleBlur={handleBlur}
          handleChange={handleChange}
          inline
          label={`${label} expressed in`}
          name={primaryFieldName}
          placeholder="Ex. Pharynx"
          value={values[name].value}
        />

        <Field
          handleBlur={handleBlur}
          handleChange={handleChange}
          inline
          label="During"
          name={duringFieldName}
          placeholder="Ex. Embryo Ce"
          value={values.during.value}
        />

        <Field
          handleBlur={handleBlur}
          handleChange={handleChange}
          inline
          label="Subcellular localization"
          name={subcellFieldName}
          placeholder="Ex. Nucleus"
          value={values.subcellularLocalization.value}
        />

        {first && (
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
    </React.Fragment>
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
          key={uuid()}
          label={row.label}
          name={row.name}
          setFieldValue={setFieldValue}
          values={get(values, 'geneExpression.observeExpression')}
        />
      ))}
    </Wrapper>
  )
}

const ObserveExpression = props => (
  <div>
    <h4>
      When and where did you observe expression? *
      {props.error && <Error>{props.error}</Error>}
    </h4>
    <Inputs {...props} />
  </div>
)

export default ObserveExpression
