const id = {
  type: 'string',
  format: 'uuid',
}

const arrayOfIds = {
  type: 'array',
  items: id,
  default: [],
}

const email = {
  type: 'string',
  format: 'email',
}

const string = {
  type: 'string',
}

const stringNotEmpty = {
  type: 'string',
  minLength: 1,
}

module.exports = {
  arrayOfIds,
  email,
  id,
  string,
  stringNotEmpty,
}
