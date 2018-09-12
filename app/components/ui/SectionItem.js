/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { uniqueId } from 'lodash'

import { th } from '@pubsweet/ui-toolkit'
import { Action as UIAction, ActionGroup } from '@pubsweet/ui'

import AssignEditor from '../dashboard/AssignEditor'
import { StatusItem } from '../ui'

import TitleWithActions from './TitleWithActions'

const SectionItemWrapper = styled.div`
  display: flex;
  flex: 0 1 100%;
  flex-flow: column nowrap;
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const GenericRow = styled.div`
  align-items: center;
  display: flex;
  flex: 0 1 100%;
  justify-content: flex-start;
  margin-bottom: calc(${th('gridUnit')});
`

const Action = styled(UIAction)`
  line-height: unset;
`

const SectionItem = props => {
  const { deleteArticle, editors, id: articleId, statusItems, title } = props

  const ArticleActions = (
    <ActionGroup>
      <Action to={`/article/${articleId}`}>Edit</Action>
      <Action onClick={() => deleteArticle({ variables: { id: articleId } })}>
        Delete
      </Action>
    </ActionGroup>
  )

  return (
    <SectionItemWrapper key={articleId}>
      <GenericRow>
        {statusItems.map(i => {
          if (!i) return null
          if (!i.date) return <StatusItem key={uniqueId()} status={i} />
          return <StatusItem key={uniqueId()} label={i.date.toString()} />
        })}
      </GenericRow>

      <TitleWithActions rightComponent={ArticleActions} title={title} />

      <GenericRow>
        {editors && <AssignEditor articleId={articleId} />}
      </GenericRow>
    </SectionItemWrapper>
  )
}

export default SectionItem
