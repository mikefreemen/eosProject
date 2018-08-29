import React, { Component } from 'react';
const { BlockList } = require('./BlockList')

class RecentBlocksWidget extends Component {

  state = {
    blockListInfo: []
  }

  componentDidMount() {
    this.fetchRecentBlocks()
  }

  fetchRecentBlocks = () => {
    console.log('top of fetchRecentBlocks()')
    fetch('http://localhost:3001/getRecentBlocks').then(body => (body.json())).then((recentBlocks) => {
      console.log('RecentBlocksWidget.fetchRecentBlocks() result:')
      console.log(recentBlocks)
      this.setState({blockListInfo: recentBlocks})
    }).catch((err) => {
      console.error(err)
    })
  }

  handleSubmit = (e) => {
    this.fetchRecentBlocks()
    e.preventDefault()
  }

  render(props) {
    console.log('RecentBlocksWidget.render() :: this.state.blockListInfo:')
    console.log(this.state.blockListInfo)
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Load" />
      </form>
      <BlockList blockList={this.state.blockListInfo} />
    </div>)
  }
}

export { RecentBlocksWidget }
