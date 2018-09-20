const uuid = require('uuid')
const _ = require('lodash')

const db = require('pubsweet-server/src/db')
const Model = require('pubsweet-server/src/models/Model')

const deleteManuscript = id =>
  db.query('DELETE FROM entities WHERE id = $1', [id])

const manuscriptGqlToDb = (manuscript, owner) => {
  const manuscriptDb = _.cloneDeep(manuscript)
  delete manuscriptDb.id
  // if (owner) {
  //   manuscriptDb.submissionMeta.createdBy = owner
  // }
  manuscriptDb.type = 'manuscript'
  return manuscriptDb
}

const manuscriptDbToGql = (manuscriptDb, id) => {
  const manuscript = _.cloneDeep(manuscriptDb)
  manuscript.id = id
  delete manuscript.type
  return manuscript
}

const save = async obj => {
  const id = uuid.v4()
  await db.raw('INSERT INTO manuscripts (id, data) VALUES (?, ?)', [id, obj])
  return id
}

const select = async selector => {
  const where = Model.selectorToSql(selector)

  const { rows } = await db.raw(
    `SELECT id, data FROM manuscripts WHERE ${where.join(' AND ')}`,
    Object.values(selector),
  )

  return rows.map(row => manuscriptDbToGql(row.data, row.id))
}

const selectId = async id => {
  const { rows } = await db.raw(
    `SELECT id, data FROM manuscripts WHERE id = ?`,
    [id],
  )
  if (!rows.length) {
    throw new Error('Entity not found')
  }
  return manuscriptDbToGql(rows[0].data, rows[0].id)
}

const update = async (obj, id) => {
  await db.raw('UPDATE manuscripts SET data = ? WHERE id = ?', [id, obj])
  return id
}

module.exports = {
  deleteManuscript,
  manuscriptDbToGql,
  manuscriptGqlToDb,
  save,
  select,
  selectId,
  update,
}
