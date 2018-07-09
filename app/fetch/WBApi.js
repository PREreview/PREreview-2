import config from 'config'

const getWBPerson = async value => {
  const { baseUrl } = config['pubsweet-client']
  const url = `${baseUrl}api/wb/users?search=${value}`

  return fetch(url)
}

/* eslint-disable-next-line import/prefer-default-export */
export { getWBPerson }
