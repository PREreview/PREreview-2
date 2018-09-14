/* eslint-disable import/prefer-default-export */

const isTruthy = string => string.toLowerCase() === 'true'

// Reverts camelCase
// Source: https://stackoverflow.com/a/4149393
const unCamelCase = string =>
  string.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

export { isTruthy, unCamelCase }
