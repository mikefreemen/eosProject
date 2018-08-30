import PropTypes from 'prop-types'

const blockPropType = PropTypes.shape({
  blockHash: PropTypes.string,
  timestamp: PropTypes.string,
  numActions: PropTypes.number,
  rawBlockData: PropTypes.objectOf(PropTypes.any)
})

export {
  blockPropType
}
