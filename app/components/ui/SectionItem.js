/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'

const Wrapper = styled.div`
  align-items: center;
  border-left: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  margin-bottom: calc(${th('gridUnit')});
`

const Title = styled.div`
  flex: 1;
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeHeading4')};
  line-height: ${th('lineHeightHeading4')};
  margin-left: ${th('gridUnit')};
`

const SectionItem = props => {
  const { rightComponent, title } = props

  return (
    <Wrapper>
      <Title>{title || 'Untitled'}</Title>
      {rightComponent}
    </Wrapper>
  )
}

export default SectionItem
