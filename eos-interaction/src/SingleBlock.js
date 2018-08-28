import React, {Component} from 'react'

class SingleBlock extends Component {
  logApiCalls(respPromise) {
    respPromise.then(resp => {
      console.log(resp)
    }).catch((err) => {
      console.log('Error...')
      console.log(err)
    })

  }

  render() {
    console.log('from SingleBlock:')
    console.log(this.props.blockInfo)
    return this.props.blockInfo && (<div>
      <div>Block hash: {this.props.block_num}</div>
      <div>Timestamp: {this.props.blockInfo.timestamp}</div>
      <div># Actions in block: {this.props.blockInfo.transactions.length}</div>
      {/*<div>[{JSON.stringify(this.props.blockInfo, null, 2)}]</div>*/}
    </div>)
  }
}

export { SingleBlock }
