import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
const { blockPropType } = require('./propTypes/Block.js')

class SingleBlock extends Component {
  state = {
    detailedView: false
  }

  logApiCalls(respPromise) {
    respPromise.then(resp => {
      console.log(resp)
    }).catch((err) => {
      console.log('Error...')
      console.log(err)
    })
  }

  handleBlockClick = () => {
    this.setState((prevState, props) => {
      return {detailedView: !prevState.detailedView}
    })
  }

  blockSummary = (props) => (
    <div>
      <div>Block hash: {this.props.blockInfo.blockId}</div>
      <div>Timestamp: {this.props.blockInfo.timestamp}</div>
      <div># Actions in block: {this.props.blockInfo.numActions}</div>
    </div>
  )

  blockDetails = (props) => (
    <div>{JSON.stringify(this.props.blockInfo.rawBlockData, null, 2)}</div>
  )

  render() {
    if( !this.props.blockInfo ) return null
    return (<Card onClick={this.handleBlockClick}>
      <CardContent>
        { this.state.detailedView && this.blockDetails() }
        { !this.state.detailedView && this.blockSummary() }
      </CardContent>
    </Card>)
  }
}

SingleBlock.propTypes = {
  blockInfo: blockPropType.isRequired
}

SingleBlock.defaultProps = {
  blockInfo: null
}

export { SingleBlock }
