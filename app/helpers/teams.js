import { isArray } from 'lodash'

/*
  GLOBAL TEAMS
*/

const getAllEditors = globalTeams =>
  getGlobalTeamMembersByType(globalTeams, 'editors')

const getAllScienceOfficers = globalTeams =>
  getGlobalTeamMembersByType(globalTeams, 'scienceOfficers')

const getGlobalTeamMembersByType = (globalTeams, type) => {
  const globalTeam = getOneTeamByType(globalTeams, type)
  return getTeamMembers(globalTeam)
}

/*
  PER ARTICLE TEAMS
*/
const getEditor = teamsForArticle => {
  const editorTeam = getEditorTeamForArticle(teamsForArticle)
  return getFirstMemberOfTeam(editorTeam)
}

const getEditorTeamForArticle = teamsForArticle =>
  getOneTeamByType(teamsForArticle, 'editor')

const getEditorTeamId = teamsForArticle => {
  const editorTeam = getEditorTeamForArticle(teamsForArticle)
  if (!editorTeam) return null
  return editorTeam.id
}

// Get science officer assigned to article
const getScienceOfficer = teamsForArticle => {
  const scienceOfficerTeam = getScienceOfficerTeamForArticle(teamsForArticle)
  return getFirstMemberOfTeam(scienceOfficerTeam)
}

const getScienceOfficerTeamForArticle = teamsForArticle =>
  getOneTeamByType(teamsForArticle, 'scienceOfficer')

/*
  GENERIC HELPERS
*/

const getFirstMemberOfTeam = team => {
  const members = getTeamMembers(team)
  if (!members) return null
  return members[0]
}

const getTeamMembers = team => {
  if (!team) return null
  const { members } = team

  if (!members || !isArray(members)) return null
  return members
}

const getOneTeamByType = (teams, type) =>
  teams && teams.find(t => t.teamType === type)

/*
  EXPORT
*/

export {
  getAllEditors,
  getAllScienceOfficers,
  getGlobalTeamMembersByType,
  getEditor,
  getEditorTeamForArticle,
  getEditorTeamId,
  getScienceOfficer,
  getScienceOfficerTeamForArticle,
  getFirstMemberOfTeam,
  getTeamMembers,
  getOneTeamByType,
}
