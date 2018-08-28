import React, { Component } from 'react';
const { BlockList } = require('./BlockList')

class RecentBlocksWidget extends Component {

  state = {
    blockInfo: '<don\'t have any yet>'
  }

  componentDidMount() {
    this.fetchRecentBlocks()
  }

  fetchRecentBlocks = () => {
    console.log('top of fetchRecentBlocks()')
    fetch('http://localhost:3001/getRecentBlocks').then(body => (body.json())).then((recentBlocks) => {
      console.log('fetchRecentBlocks() result:')
      console.log(recentBlocks)
      this.setState({blockInfo: recentBlocks})
    }).catch((err) => {
      console.error(err)
    })
  }

  render(props) {
    return (<div>
      <form onSubmit={this.fetchRecentBlocks}>
        <input type="submit" value="Load" />
      </form>
      <BlockList blockInfo={this.state.blockInfo} />
    </div>)
  }
}

export { RecentBlocksWidget }
