// This resets Manuscript and Review tables

const { model: Manuscript } = require('../server/manuscript/src')
const { model: Review } = require('../server/review/src')

Manuscript.query().delete()
Review.query().delete()
