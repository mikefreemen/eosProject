import React from 'react'
import { SingleBlock } from './SingleBlock'

function BlockList (props) {
  return <div>
    {props.blockList.map(blockInfo => {
        return <SingleBlock key={blockInfo.blockId} blockInfo={blockInfo} />
    })}
  </div>
}

export { BlockList }
