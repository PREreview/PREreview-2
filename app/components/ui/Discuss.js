/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { isArray, clone } from 'lodash'

import { Button, List } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

import { DiscussForm } from '../form'
import { Accordion, PanelTextEditor as Editor } from './index'

const DiscussionWrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  margin-left: calc(${th('gridUnit')} * 3);
`

const transformEntries = entries =>
  entries.map(entry => ({
    id: entry.id,
    label: entry.user.username,
    readOnly: true,
    value: entry.content,
  }))

/*
  HACK
  In order for the editor content to be reset, we need to destroy the xpub-edit
  instance and create a new one. We only need to reset the value on submit. So
  this is a counter that is incremented on every submit.
*/
let key = 0

const NewEntry = props => (
  <DiscussForm {...props}>
    {formProps => {
      const { handleSubmit: submit, setFieldValue, values } = formProps

      const handleSubmit = e => {
        key += 1
        submit(e)
        setFieldValue('content', '')
      }

      return (
        <React.Fragment>
          <Editor
            key={key}
            name="content"
            placeholder="Make a comment"
            value={values.content}
            {...formProps}
          />

          <Button onClick={handleSubmit} primary type="submit">
            Send
          </Button>
        </React.Fragment>
      )
    }}
  </DiscussForm>
)

const Discuss = props => {
  const { article } = props
  const { communicationHistory } = article

  let entries = clone(communicationHistory)
  const hasEntries = isArray(entries) && entries.length > 0
  if (hasEntries) entries = transformEntries(entries)

  return (
    <Accordion label="Discuss">
      <DiscussionWrapper>
        {hasEntries && <List component={Editor} items={entries} />}
        <NewEntry {...props} />
      </DiscussionWrapper>
    </Accordion>
  )
}

export default Discuss
