import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Button from '@material-ui/core/Button'

import { RecentBlocksContainer } from './RecentBlocksContainer'

describe('RecentBlocksContainer', () => {
  const fetchStub = sinon.spy()
  const wrapper = shallow(<RecentBlocksContainer handleFetchRecentBlocks={fetchStub} />)
  it('Initial fetch is done on mount', () => {
    expect(fetchStub).to.have.property('callCount', 1)
  })
  it('Load button requests latest blocks when clicked', () => {
    wrapper.find(Button).first().simulate('click')
    expect(fetchStub).to.have.property('callCount', 2)
  })
})
