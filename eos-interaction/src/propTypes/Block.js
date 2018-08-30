import PropTypes from 'prop-types'

const blockPropType = PropTypes.shape({
  blockHash: PropTypes.string,
  timestamp: PropTypes.string,
  numActions: PropTypes.string,
  rawBlockData: PropTypes.objectOf(PropTypes.any)
})

export {
  blockPropType
}
