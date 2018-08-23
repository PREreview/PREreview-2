/* eslint-disable react/prop-types */

import React from 'react'
import { adopt } from 'react-adopt'

import { getGlobalTeams, getTeamsForArticle, updateTeam } from './pieces'

const mapper = {
  getGlobalTeams,
  getTeams: props => getTeamsForArticle(props),
  updateTeam,
}

const getAllEditors = globalTeams =>
  globalTeams && globalTeams.find(t => t.teamType === 'editors').members

const getEditorTeamForArticle = teamsForArticle =>
  teamsForArticle && teamsForArticle.find(t => t.teamType === 'editor')

const getEditor = team => {
  if (!team) return null
  if (team.members.length > 0) return team.members[0]
  return undefined
}

const mapProps = args => {
  const editorTeamForArticle = getEditorTeamForArticle(
    args.getTeams.data.teamsForArticle,
  )
  const editor = getEditor(editorTeamForArticle)

  return {
    allEditors: getAllEditors(args.getGlobalTeams.data.globalTeams),
    editor,
    editorTeamId: editorTeamForArticle && editorTeamForArticle.id,
    loading: args.getGlobalTeams.loading || args.getTeams.loading,
    updateTeam: args.updateTeam.updateTeam,
  }
}

const Composed = adopt(mapper, mapProps)

const ComposedAssignEditor = props => {
  const { render, ...otherProps } = props
  return <Composed {...otherProps}>{render}</Composed>
}

export default ComposedAssignEditor
