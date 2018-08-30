import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
const { BlockList } = require('./BlockList')
const _get = require('lodash.get')

class RecentBlocksWidget extends Component {

  state = {
    blockListInfo: [],
    status: ''
  }

  componentDidMount() {
    this.fetchRecentBlocks()
  }

  fetchRecentBlocks = async () => {
    this.setState({
      status: 'Loading...',
      blockListInfo: []
    })

    let recentBlocks
    try {
      recentBlocks = await fetch('http://localhost:3001/getRecentBlocks').then(async body => (body.json()))
      this.setState({
        blockListInfo: recentBlocks,
        status: ''
      })
    } catch(error) {
      this.setState({
        blockListInfo: recentBlocks,
        status: _get(error, 'message', 'Unknown error while getting blocks.')
      })
    }

  }

  handleSubmit = (e) => {
    this.fetchRecentBlocks()
    e.preventDefault()
  }

  render() {
    return (<div>
      <Button onClick={this.handleSubmit} variant='raised' color='primary' size='medium' >Load</Button>
      <div>{this.state.status}</div>
      <BlockList blockList={this.state.blockListInfo} />
    </div>)
  }
}

export { RecentBlocksWidget }
