import PropTypes from 'prop-types'

const blockPropType = PropTypes.shape({
  blockId: PropTypes.number,
  timestamp: PropTypes.string,
  transactions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
})

export {
  blockPropType
}
