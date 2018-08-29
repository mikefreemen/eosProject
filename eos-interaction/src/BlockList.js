import React from 'react'
import { SingleBlock } from './SingleBlock'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
const { blockPropType } = require('./propTypes/Block.js')

function BlockList (props) {
  return <Grid container spacing={8} justify='center' alignItems='center'>
    {props.blockList.map(blockInfo => {
      return (<Grid item xs={12} sm={12} lg={12} xl={12} key={blockInfo.blockHash} >
        <SingleBlock blockInfo={blockInfo} />
      </Grid>)
    })}
  </Grid>
}

BlockList.propTypes = {
  blockList: PropTypes.arrayOf(blockPropType).isRequired
}

BlockList.defaultProps = {
  blockList: []
}

export { BlockList }
