import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import _get from 'lodash.get'
import PropTypes from 'prop-types'

import { BlockList } from './BlockList'

class RecentBlocksContainer extends Component {

  state = {
    blockListInfo: [],
    status: ''
  }

  componentDidMount() {
    this.requestRecentBlocks()
  }

  requestRecentBlocks = async (e) => {
    this.setState({
      status: 'Loading...',
      blockListInfo: []
    })

    let recentBlocks
    try {
      // recentBlocks = await fetch(`${config.middlewareUrl}/getRecentBlocks`).then(async body => (body.json()))
      recentBlocks = await this.props.handleFetchRecentBlocks()
      this.setState({
        blockListInfo: recentBlocks,
        status: ''
      })
    } catch(error) {
      console.error(error)
      this.setState({
        blockListInfo: recentBlocks,
        status: _get(error, 'message', 'Unknown error while getting blocks.')
      })
    }
  }

  handleSubmit = (e) => {
    this.requestRecentBlocks()
    if( e ) { e.preventDefault() }
  }

  render() {
    return (<div>
      <Button onClick={this.handleSubmit} variant='raised' color='primary' size='medium' >Load</Button>
      <div>{this.state.status}</div>
      <BlockList blockList={this.state.blockListInfo} />
    </div>)
  }
}

RecentBlocksContainer.propTypes = {
  handleFetchRecentBlocks: PropTypes.func.isRequired
}

RecentBlocksContainer.propTypes = {
  
}

export { RecentBlocksContainer }
