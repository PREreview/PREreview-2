import { find, isArray, isUndefined, uniq } from 'lodash'

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

// Get all users that are not in the global teams
const getRegularUsers = (users, globalTeams) => {
  if (!users || !globalTeams) return null

  let allGlobalIds = []
  globalTeams.forEach(team => {
    team.members.forEach(member => {
      allGlobalIds.push(member.id)
    })
  })
  allGlobalIds = uniq(allGlobalIds)

  return users.filter(user => !user.admin && !allGlobalIds.includes(user.id))
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

const getReviewerTeams = teams => {
  if (!teams) return null
  return teams.filter(t => t.name.match(/^reviewers-/))
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

const isMember = (team, userId) => {
  const userInTeam = find(team.members, { id: userId })
  return !isUndefined(userInTeam)
}

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
  getRegularUsers,
  getReviewerTeams,
  getScienceOfficer,
  getScienceOfficerTeamForArticle,
  getFirstMemberOfTeam,
  getTeamMembers,
  getOneTeamByType,
  isMember,
}
