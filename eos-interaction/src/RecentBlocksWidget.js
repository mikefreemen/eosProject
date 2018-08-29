import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
const { BlockList } = require('./BlockList')

class RecentBlocksWidget extends Component {

  state = {
    blockListInfo: [],
    status: ''
  }

  componentDidMount() {
    this.fetchRecentBlocks()
  }

  fetchRecentBlocks = () => {
    this.setState({status: 'Loading...'})
    fetch('http://localhost:3001/getRecentBlocks').then(body => (body.json())).then((recentBlocks) => {
      this.setState({
        blockListInfo: recentBlocks,
        status: ''
      })
    }).catch((err) => {
      console.error(err)
    })
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
