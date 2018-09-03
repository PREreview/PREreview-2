/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'
import { List } from '@pubsweet/ui'

import { SectionItem } from './index'

const Title = styled.h2`
  align-self: flex-end;
  color: ${th('colorPrimary')};
  line-height: 20px;
  margin: 0 ${th('gridUnit')} 0 0;
  text-transform: uppercase;
`

const Header = styled.div`
  align-items: flex-end;
  display: flex;
  flex: 0 1 100%;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: calc(${th('gridUnit')} * 2) auto;
`
const Actions = styled.div`
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`

const NoItems = styled.div`
  color: ${th('colorTextPlaceholder')};
  font-style: italic;
`

const Section = props => {
  const { actions, editors, items, label } = props

  let decoratedItems
  if (items && items.length > 0) {
    decoratedItems = items.map(item => {
      // const event = { date: new Date() }
      const event = null
      const { status } = item
      return Object.assign({}, item, {
        editors,
        statusItems: [status, event],
      })
    })
  }

  const hasItems = decoratedItems && decoratedItems.length > 0
  const emptyMessage = 'There are no articles to display'

  return (
    <div>
      <Header>
        <Title>{label}</Title>
        <Actions>{actions}</Actions>
      </Header>

      {hasItems && <List component={SectionItem} items={decoratedItems} />}

      {!hasItems && <NoItems>{emptyMessage}</NoItems>}
    </div>
  )
}

export default Section
