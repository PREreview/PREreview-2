import React from 'react'
import { mount } from 'enzyme'
import Submit from '../components/Submit'

describe('Submit', () => {
  // only here to make sure mount works
  it('matches fully rendered snapshot', () => {
    const wrapper = mount(<Submit />)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
