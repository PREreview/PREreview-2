import config from 'config'

const { baseUrl } = config['pubsweet-client']
const apiUrl = `${baseUrl}api/wb`

const makeCall = async (endpoint, value) => {
  const url = `${apiUrl}/${endpoint}?search=${value}`
  return fetch(url)
}

const getWBPerson = value => makeCall('person', value)
const getWBLaboratory = value => makeCall('laboratory', value)
const getWBSpecies = value => makeCall('species', value)
const getTransgene = value => makeCall('transgene', value)
const getReporter = value => makeCall('reporter', value)
const getWBbt = value => makeCall('wbbt', value)
const getWBls = value => makeCall('wbls', value)
const getGOcc = value => makeCall('gocc', value)
const getVariation = value => makeCall('variation', value)
const getBackboneVector = value => makeCall('backbonevector', value)
const getFusionType = value => makeCall('fusiontype', value)

export {
  getWBPerson,
  getWBLaboratory,
  getWBSpecies,
  getTransgene,
  getReporter,
  getWBbt,
  getWBls,
  getGOcc,
  getVariation,
  getBackboneVector,
  getFusionType,
}
