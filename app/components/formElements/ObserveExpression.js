import React from 'react'
import styled from 'styled-components'

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

const Wrapper = styled.div`
  /* background: blue; */
  display: flex;
  flex-direction: column;
`

const Inputs = () => (
  <Wrapper>
    {rows.map(row => (
      <Row>
        <Field
          inline
          label={`${row.label} expressed in`}
          placeholder="Ex. Pharynx"
        />
        <Field inline label="During" placeholder="Ex. Embryo Ce" />
        <Field
          inline
          label="Subcellular localization"
          placeholder="Ex. Nucleus"
        />
      </Row>
    ))}
  </Wrapper>
)

const ObserveExpression = () => (
  <div>
    <h4>When and where did you observe expression?</h4>
    <Inputs />
  </div>
)

export default ObserveExpression
