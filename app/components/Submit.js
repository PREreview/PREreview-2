import React from 'react'

import Loading from './Loading'

class Submit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
    }
  }

  render() {
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 2000)
      return <Loading />
    }

    return (
      <div>
        <h1>This is a wonderful submit page</h1>
        <p>What joy!</p>
      </div>
    )
  }
}

export default Submit
