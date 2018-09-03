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
  const { allEditors, editor, editorTeamId, loading, updateTeam } = props
  if (loading) return null

  const options = mapUsersToOptions(allEditors)
  const value = mapUserToSelect(editor)

  const handleChange = newValue => {
    const input = { members: [newValue.value] }
    updateTeam({ variables: { id: editorTeamId, input } })
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
