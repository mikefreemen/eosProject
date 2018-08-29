import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import './SingleBlock.css'
//image from https://commons.wikimedia.org/w/index.php?curid=19049310
import davidRicardoImg from './david_ricardo.jpg'
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

  blockSummary = () => (
    <div className={'block-content'} >
      <div>Block hash: {this.props.blockInfo.blockHash}</div>
      <div>Timestamp: {this.props.blockInfo.timestamp}</div>
      <div># Actions in block: {this.props.blockInfo.numActions}</div>
      {this.props.blockInfo.ricardianContractAsHtml && <div className={'ricardian-container'}><img className={'ricardo-img'} src={davidRicardoImg} />Ricardian Contract Available</div>}
    </div>
  )

  blockDetails = () => (
    <div>
      <div>{JSON.stringify(this.props.blockInfo.rawBlockData, null, 2)}</div>
      <div className={'ricardian-contract'} dangerouslySetInnerHTML={ { __html: this.props.blockInfo.ricardianContractAsHtml } } />
    </div>
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
