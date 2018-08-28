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
    return <div>[{JSON.stringify(this.props.blockInfo, null, 2)}]</div>
  }
}

export { SingleBlock }
