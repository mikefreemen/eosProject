import React from 'react';

import config from '../config.json'

import { RecentBlocksContainer } from './RecentBlocksContainer'

function RecentBlocksWidget (props) {

  function fetchRecentBlocks () {
    return fetch(`${config.middlewareUrl}/getRecentBlocks`).then(async body => (body.json()))
  }

  return <RecentBlocksContainer handleFetchRecentBlocks={fetchRecentBlocks} />
}

export { RecentBlocksWidget }
