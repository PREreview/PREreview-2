/* eslint-disable react/prop-types */

import React from 'react'
import { isArray, clone } from 'lodash'

import { Accordion, Button, List } from '@pubsweet/ui'

import { DiscussForm } from '../form'
import { PanelTextEditor as Editor } from './index'

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
    <Accordion label="Discuss" startExpanded>
      {hasEntries && <List component={Editor} items={entries} />}
      <NewEntry {...props} />
    </Accordion>
  )
}

export default Discuss
