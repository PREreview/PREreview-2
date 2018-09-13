/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Action, ActionGroup } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import AssignEditor from '../dashboard/AssignEditor'
import SectionItemWithStatus from './SectionItemWithStatus'

const Wrapper = styled.div`
  margin-bottom: ${th('gridUnit')};
`

const EditorToolRow = styled.div`
  display: flex;
`

const Actions = ({ articleId }) => (
  <ActionGroup>
    <Action to={`/article/${articleId}`}>Go to Article</Action>
  </ActionGroup>
)

const EditorSecionItem = props => {
  const { id: articleId } = props
  const ActionsComponent = <Actions articleId={articleId} />

  return (
    <Wrapper>
      <SectionItemWithStatus actionsComponent={ActionsComponent} {...props} />

      <EditorToolRow>
        <AssignEditor articleId={articleId} />
      </EditorToolRow>
    </Wrapper>
  )
}

export default EditorSecionItem
