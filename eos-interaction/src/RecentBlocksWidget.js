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
    fetch('http://localhost:3001/getRecentBlocks').then(body => (body.json())).then((recentBlocks) => {
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
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Load" />
      </form>
      <BlockList blockList={this.state.blockListInfo} />
    </div>)
  }
}

export { RecentBlocksWidget }
