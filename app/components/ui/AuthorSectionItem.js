/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { Action, ActionGroup } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { isEditableByAuthor } from '../../helpers/status'
import SectionItemWithStatus from './SectionItemWithStatus'

const Wrapper = styled.div`
  margin-bottom: ${th('gridUnit')};
`

const Actions = props => {
  const { articleId, deleteArticle, status } = props
  const isEditable = isEditableByAuthor(status)

  return (
    <ActionGroup>
      <Action to={`/article/${articleId}`}>
        {isEditable ? 'Edit' : 'View Article'}
      </Action>

      {isEditable && (
        <Action onClick={() => deleteArticle({ variables: { id: articleId } })}>
          Delete
        </Action>
      )}
    </ActionGroup>
  )
}

const AuthorSectionItem = props => {
  const { deleteArticle, id, status } = props

  const ActionsComponent = (
    <Actions articleId={id} deleteArticle={deleteArticle} status={status} />
  )

  return (
    <Wrapper>
      <SectionItemWithStatus actionsComponent={ActionsComponent} {...props} />
    </Wrapper>
  )
}

export default AuthorSectionItem
