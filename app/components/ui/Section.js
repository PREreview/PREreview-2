/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'
import { List } from '@pubsweet/ui'

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

const HeaderActions = styled.div`
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
  const { actions, itemComponent, editors, items, label, ...rest } = props

  const hasItems = items && items.length > 0
  const emptyMessage = 'There are no articles to display'

  return (
    <div>
      <Header>
        <Title>{label}</Title>
        <HeaderActions>{actions}</HeaderActions>
      </Header>

      {hasItems && <List component={itemComponent} items={items} {...rest} />}

      {!hasItems && <NoItems>{emptyMessage}</NoItems>}
    </div>
  )
}

export default Section
