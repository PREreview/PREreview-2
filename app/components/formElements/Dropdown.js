/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Menu } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: 400px;

  label {
    margin-bottom: calc(${th('gridUnit')});
  }

  div[role='listbox'] {
    div {
      div {
        margin-bottom: ${th('gridUnit')};
      }
    }
  }
`

const Dropdown = props => {
  const { label, options } = props

  return (
    <Wrapper>
      <Menu label={label} options={options} />
    </Wrapper>
  )
}

export default Dropdown
