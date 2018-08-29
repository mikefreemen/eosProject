import React, { Component } from 'react'
import { SingleBlock } from './SingleBlock'

class BlockList extends Component {

  render() {
    console.log('BlockList.render() :: this.props.blocklist:')
    console.log(this.props.blockList)
    return <div>
      {this.props.blockList.map(blockInfo1 => {
          console.log('BlockList: processing blockInfo:')
          console.log(blockInfo1)
          return <SingleBlock key={blockInfo1.blockId} blockInfo={blockInfo1} />
      })}
    </div>
  }
}

export { BlockList }
