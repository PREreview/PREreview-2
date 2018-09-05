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

const SectionItemWrapper = styled.div`
  display: flex;
  flex: 0 1 100%;
  flex-flow: column nowrap;
  margin-bottom: calc(${th('gridUnit')} * 2);
`
const SectionItemTitleWrapper = styled.div`
  flex: 1;
`
const GenericRow = styled.div`
  display: flex;
  flex: 0 1 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: calc(${th('gridUnit')});
`
const SecondRow = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: calc(${th('gridUnit')});
  flex: 0 1 100%;
  border-left: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
`

const SectionItemTitle = styled.div`
  font-size: ${th('fontSizeHeading4')};
  font-family: ${th('fontReading')};
  line-height: ${th('lineHeightHeading4')};
  margin-left: ${th('gridUnit')};
  word-wrap: break-word;
`

const Action = styled(UIAction)`
  line-height: unset;
`

const SectionItem = item => (
  <SectionItemWrapper key={item.id}>
    <GenericRow>
      {item.statusItems.map(i => {
        if (!i) return null
        if (!i.date) return <StatusItem key={uniqueId()} status={i} />
        return <StatusItem key={uniqueId()} label={i.date.toString()} />
      })}
    </GenericRow>

    <SecondRow>
      <SectionItemTitleWrapper>
        <SectionItemTitle>{item.title || 'Untitled'}</SectionItemTitle>
      </SectionItemTitleWrapper>

      <ActionGroup>
        <Action to={`/article/${item.id}`}>Edit</Action>
        <Mutation
          mutation={DELETE_MANUSCRIPT}
          refetchQueries={[{ query: GET_MANUSCRIPTS }]}
        >
          {deleteManuscript => (
            <Action
              onClick={() => deleteManuscript({ variables: { id: item.id } })}
            >
              Delete
            </Action>
          )}
        </Mutation>
      </ActionGroup>
    </SecondRow>

    <GenericRow>
      {item.editors && <AssignEditor articleId={item.id} />}
    </GenericRow>
  </SectionItemWrapper>
)

export default SectionItem
