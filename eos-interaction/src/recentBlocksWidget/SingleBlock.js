import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import './SingleBlock.css'
// image attribution: https://commons.wikimedia.org/w/index.php?curid=19049310
import davidRicardoImg from './david_ricardo.jpg'
const moment = require('moment')
const { blockPropType } = require('../propTypes/Block.js')

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
      <div>Timestamp: {moment(this.props.blockInfo.timestamp).toString()}</div>
      <div># Actions in block: {this.props.blockInfo.numActions}</div>
      {this.props.blockInfo.ricardianContractAsHtml && <div className={'ricardian-contract-indicator'}>Ricardian Contract Available<img className={'ricardo-img'} src={davidRicardoImg} alt='Img of Ricardo' /></div>}
    </div>
  )

  blockDetails = () => (
    <div className={'block-content'}><span className={'detailed-block-header'}>Raw Block Data</span>
      <div className={'raw-block-data'}>{JSON.stringify(this.props.blockInfo.rawBlockData, null, 2)}</div>
      <Divider />
      <div className={'ricardian-contract'} dangerouslySetInnerHTML={ { __html: this.props.blockInfo.ricardianContractAsHtml } } />
    </div>
  )

  render() {
    if( !this.props.blockInfo ) return null
    return (<Card onClick={this.handleBlockClick}>
      <CardContent>
        { this.blockSummary() }
        { this.state.detailedView && this.blockDetails() }
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
