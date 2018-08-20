#!/usr/bin/env node

const logger = require('@pubsweet/logger')
const { Team } = require('pubsweet-server/src/models')

const makeTeam = async type => {
  const names = {
    editors: 'Editors',
    scienceOfficers: 'Science Officers',
  }

  logger.info(`Create ${names[type]} team`)

  const team = new Team({
    global: true,
    members: [],
    name: names[type],
    teamType: type,
  })

  await team.save()
  logger.info(`${names[type]} team successfully created`)
}

const seed = async () => {
  logger.info('### RUNNING GLOBAL TEAMS SEED SCRIPTS ###')
  logger.info('=> Checking if global teams exist...')

  try {
    const teams = await Team.findByField({ global: true })

    const editorsTeam = teams.find(t => t.teamType === 'editors')
    const scienceOfficersTeam = teams.find(
      t => t.teamType === 'scienceOfficers',
    )

    if (editorsTeam && scienceOfficersTeam) {
      logger.info('All global teams found, exiting...')
    } else {
      if (!editorsTeam) {
        logger.warn('No Editors team found')
        await makeTeam('editors')
      } else {
        logger.info('Editors team already exists')
      }

      if (!scienceOfficersTeam) {
        logger.warn('No Science Officers team found')
        await makeTeam('scienceOfficers')
      } else {
        logger.info('Scince Officers team already exists')
      }
    }
  } catch (err) {
    logger.warn('No global teams found')

    await makeTeam('editors')
    await makeTeam('scienceOfficers')
  }

  logger.info('Team seed successfully finished')
}

seed()
