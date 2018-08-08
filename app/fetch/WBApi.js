import config from 'config'

const { baseUrl } = config['pubsweet-client']
const apiUrl = `${baseUrl}/api/wb`

const get = async (endpoint, value) => {
  const url = `${apiUrl}/${endpoint}?search=${value}`
  return fetch(url)
}

const validate = async (endpoint, payload) => {
  const { id, search } = payload
  const url = `${apiUrl}/validate/${endpoint}?search=${search}&id=${id}&`
  return fetch(url)
}

const getBackboneVector = value => get('backbonevector', value)
const getFusionType = value => get('fusiontype', value)
const getGOcc = value => get('gocc', value)
const getIntegrationMethod = value => get('integrationmethod', value)
const getReporter = value => get('reporter', value)
const getTransgene = value => get('transgene', value)
const getVariation = value => get('variation', value)
const getWBGene = value => get('gene', value)
const getWBbt = value => get('wbbt', value)
const getWBLaboratory = value => get('laboratory', value)
const getWBls = value => get('wbls', value)
const getWBPerson = value => get('person', value)
const getWBSpecies = value => get('species', value)

const validateBackboneVector = value => validate('backbonevector', value)
const validateFusionType = value => validate('fusiontype', value)
const validateGOcc = value => validate('gocc', value)
const validateIntegrationMethod = value => validate('integrationmethod', value)
const validateReporter = value => validate('reporter', value)
const validateTransgene = value => validate('transgene', value)
const validateVariation = value => validate('variation', value)
const validateWBGene = value => validate('gene', value)
const validateWBbt = value => validate('wbbt', value)
const validateWBLaboratory = value => validate('laboratory', value)
const validateWBls = value => validate('wbls', value)
const validateWBPerson = value => validate('person', value)
const validateWBSpecies = value => validate('species', value)

export {
  getBackboneVector,
  getFusionType,
  getGOcc,
  getIntegrationMethod,
  getReporter,
  getTransgene,
  getVariation,
  getWBGene,
  getWBbt,
  getWBLaboratory,
  getWBls,
  getWBPerson,
  getWBSpecies,
  validateBackboneVector,
  validateFusionType,
  validateGOcc,
  validateIntegrationMethod,
  validateReporter,
  validateTransgene,
  validateVariation,
  validateWBGene,
  validateWBbt,
  validateWBLaboratory,
  validateWBls,
  validateWBPerson,
  validateWBSpecies,
}
