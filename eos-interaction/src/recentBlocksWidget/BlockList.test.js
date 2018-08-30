import React from 'react'
import { BlockList } from './BlockList'
import Grid from '@material-ui/core/Grid'
import { SingleBlock } from './SingleBlock'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import minimalBlock from '../../test/fixtures/minimalBlock.json'

describe('BlockList', () => {
  let blockArray = []
  for( let idx=0; idx<10; ++idx) {
    blockArray.push(minimalBlock)
  }
  it('renders 10 SingleBlocks', () => {
    const wrapper = shallow(<BlockList blockList={blockArray} />)
    expect(wrapper.find(SingleBlock)).to.have.length(10)
  })
})
