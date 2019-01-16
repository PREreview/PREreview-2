/* eslint-disable react/prop-types */

import React from 'react'

import ComposedAssignEditor from '../compose/AssignEditor'
import Select from '../ui/Select'

const mapUserToSelect = user =>
  user && {
    label: user.username,
    value: user.id,
  }

const mapUsersToOptions = users =>
  users && users.map(user => mapUserToSelect(user))

const AssignEditor = props => {
  const {
    allEditors,
    articleId,
    editor,
    editorTeamId,
    loading,
    updateCurrentlyWith,
    updateTeam,
  } = props
  if (loading) return null

  const options = mapUsersToOptions(allEditors)
  const value = mapUserToSelect(editor)

  const handleChange = newValue => {
    const input = { members: [newValue.value] }
    updateTeam({ variables: { id: editorTeamId, input } }).then(() => {
      const editorId = newValue.value

      const data = {
        currentlyWith: editorId,
        id: articleId,
      }

      updateCurrentlyWith({ variables: { data } })
    })
  }

  return (
    <Select
      isSearchable={false}
      onChange={handleChange}
      options={options}
      value={value}
    />
  )
}

const Composed = ({ articleId }) => (
  <ComposedAssignEditor articleId={articleId} render={AssignEditor} />
)

export default Composed
