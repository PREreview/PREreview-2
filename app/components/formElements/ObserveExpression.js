import React from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { th } from '@pubsweet/ui-toolkit'

import TextField from './TextField'

const fields = [
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

const Row = styled.div`
  display: flex;
  justify-content: flex-start;

  div {
    div {
      /* border: 1px dashed ${th('colorBorder')}; */
      width: 500px;

      label {
        width: 10%;
      }

      /* input {
        width: 200px;
      } */
    }

    div:not(:last-child) {
      padding-right: 8px;
    }

    div:first-child {
      label {
        width: 39%;
      }
    }

    div:last-child {
      label {
        width: 45%;
      }
    }
  }
`

const Inputs = () => (
  <React.Fragment>
    {fields.map(field => (
      // generating id's on each render beats the purpose?
      <React.Fragment key={uuid()}>
        <Row>
          <TextField
            inline
            label={`${field.label} expressed in`}
            placeholder="Ex. Pharynx"
          />
          <TextField inline label="During" placeholder="Ex. Embryo Ce" />
          <TextField
            inline
            label="Subcellular localization"
            placeholder="Ex. Nucleus"
          />
        </Row>
      </React.Fragment>
    ))}
  </React.Fragment>
)

// const Wrapper = styled.div``

const ObserveExpression = () => (
  <div>
    <h4>When and where did you observe expression?</h4>
    <Inputs />
  </div>
)

export default ObserveExpression
