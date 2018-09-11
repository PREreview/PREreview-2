/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { uniqueId } from 'lodash'

import { th } from '@pubsweet/ui-toolkit'
import { Action as UIAction, ActionGroup } from '@pubsweet/ui'

import { GET_MANUSCRIPTS } from '../../queries/manuscripts'
import DELETE_MANUSCRIPT from '../../mutations/deleteManuscript'
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
  const { editors, id: articleId, statusItems, title } = props

  const ArticleActions = (
    <ActionGroup>
      <Action to={`/article/${articleId}`}>Edit</Action>
      <Mutation
        mutation={DELETE_MANUSCRIPT}
        refetchQueries={[{ query: GET_MANUSCRIPTS }]}
      >
        {deleteManuscript => (
          <Action
            onClick={() => deleteManuscript({ variables: { id: articleId } })}
          >
            Delete
          </Action>
        )}
      </Mutation>
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
