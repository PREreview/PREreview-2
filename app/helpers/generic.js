import React from 'react'

const isTruthy = string => string.toLowerCase() === 'true'

const passPropsToChildren = (children, props) =>
  React.Children.map(children, child => React.cloneElement(child, props))

/*
  Reverts camelCase
  Source: https://stackoverflow.com/a/4149393
 */
const unCamelCase = string =>
  string.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

export { isTruthy, passPropsToChildren, unCamelCase }
