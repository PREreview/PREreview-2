/* eslint-disable react/prop-types */

import React from 'react'
import styled, { css } from 'styled-components'
import { cloneDeep, remove } from 'lodash'
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
  display: flex;
  height: calc(${th('gridUnit')} * 4);
  justify-content: center;
  margin: 0 calc(${th('gridUnit')} / 2);
  min-width: unset;
  padding: 0;
  width: calc(${th('gridUnit')} * 4);

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
  const { addItem, dataId, deleteItem, first, label } = props

  return (
    <React.Fragment>
      <Row>
        <Field
          inline
          label={`${label} expressed in`}
          placeholder="Ex. Pharynx"
        />

        <Field inline label="During" placeholder="Ex. Embryo Ce" />

        <Field
          inline
          label="Subcellular localization"
          placeholder="Ex. Nucleus"
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

class RowArray extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data || [{ id: uuid() }],
    }
  }

  addItem = () => {
    this.setState({
      data: this.state.data.concat([{ id: uuid() }]),
    })
  }

  deleteItem = id => {
    const items = cloneDeep(this.state.data)
    remove(items, item => item.id === id)

    this.setState({
      data: items,
    })
  }

  render() {
    const { label } = this.props
    const { data } = this.state

    return (
      <React.Fragment>
        {data.map((row, i) => (
          <RowWithControls
            addItem={this.addItem}
            dataId={row.id}
            deleteItem={this.deleteItem}
            first={i === 0}
            key={row.id}
            label={label}
          />
        ))}
      </React.Fragment>
    )
  }
}

const Wrapper = styled.div`
  /* background: blue; */
  display: flex;
  flex-direction: column;
`

const Inputs = () => (
  <Wrapper>{rows.map(row => <RowArray label={row.label} />)}</Wrapper>
)

const ObserveExpression = () => (
  <div>
    <h4>When and where did you observe expression?</h4>
    <Inputs />
  </div>
)

export default ObserveExpression
