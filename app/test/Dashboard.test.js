import React from 'react'
import { shallow } from 'enzyme'

import Dashboard from '../components/Dashboard'

describe('Dashboard', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<Dashboard />)
    expect(wrapper).toMatchSnapshot()
  })
})
