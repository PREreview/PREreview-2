/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

const Role = styled.span`
  font-style: italic;
`

const Name = styled.span`
  margin-left: ${th('gridUnit')};
`

const Item = styled.div`
  display: inline-block;
`

const Wrapper = styled.div`
  margin-bottom: ${th('gridUnit')};
  width: 100%;

  ${Item}:first-child {
    margin-right: ${th('gridUnit')};
  }
`

const getName = user => {
  const displayName = user ? user.username : 'Not assigned'
  return displayName
}

const PanelInfo = props => {
  const { editor, scienceOfficer } = props

  const editorName = getName(editor)
  const scienceOfficerName = getName(scienceOfficer)

  return (
    <Wrapper>
      <Item>
        <Role>Editor:</Role>
        <Name>{editorName}</Name>,
      </Item>
      <Item>
        <Role>Science Officer:</Role>
        <Name>{scienceOfficerName}</Name>
      </Item>
    </Wrapper>
  )
}

export default PanelInfo
