import PropTypes from 'prop-types'

const blockPropType = PropTypes.shape({
  blockHash: PropTypes.string,
  timestamp: PropTypes.string,
  transactions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
})

export {
  blockPropType
}
