import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SingleBlock } from './SingleBlock'
import Card from '@material-ui/core/Card'

import minimalBlock from '../../test/fixtures/minimalBlock.json'

describe('SingleBlock', () => {
  it('renders single Card', () => {
    const wrapper = shallow(<SingleBlock blockInfo={minimalBlock} />)
    expect(wrapper.find(Card)).to.have.length(1)
  })
})
