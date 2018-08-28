import React, { Component } from 'react'
import { SingleBlock } from './SingleBlock'

class BlockList extends Component {

  render() {
    return <div>
      <SingleBlock blockInfo={this.props.blockInfo} />
    </div>
  }
}

export { BlockList }
