/* eslint-disable react/prop-types */

import React from 'react'

const { Provider, Consumer } = React.createContext({
  currentUser: null,
})

const withCurrentUser = Component => {
  const C = props => (
    <Consumer>
      {({ currentUser }) => <Component currentUser={currentUser} {...props} />}
    </Consumer>
  )

  return C
}

export {
  Consumer as CurrentUserConsumer,
  Provider as CurrentUserProvider,
  withCurrentUser,
}
