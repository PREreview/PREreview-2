import config from 'config'

const { baseUrl } = config['pubsweet-client']
const apiUrl = `${baseUrl}api/wb`

const makeCall = async (endpoint, value) => {
  const url = `${apiUrl}/${endpoint}?search=${value}`
  return fetch(url)
}

const getBackboneVector = value => makeCall('backbonevector', value)
const getFusionType = value => makeCall('fusiontype', value)
const getGOcc = value => makeCall('gocc', value)
const getIntegrationMethod = value => makeCall('integrationmethod', value)
const getReporter = value => makeCall('reporter', value)
const getTransgene = value => makeCall('transgene', value)
const getVariation = value => makeCall('variation', value)
const getWBGene = value => makeCall('gene', value)
const getWBbt = value => makeCall('wbbt', value)
const getWBLaboratory = value => makeCall('laboratory', value)
const getWBls = value => makeCall('wbls', value)
const getWBPerson = value => makeCall('person', value)
const getWBSpecies = value => makeCall('species', value)

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
}
