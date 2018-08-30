const assert = require('assert')
const _isEqual = require('lodash.isequal')

describe('Middlware Unit Tests', function () {
  describe('xformBlockArray()', function () {
    const { xformBlockArray } = require('../../xformers/xformBlockArray')
    // Given
    const mockBlock = require('../fixtures/minimalBlock.json')

    it('should reorg block data for convenient front-end us', function () {
      const blockArray = [mockBlock, mockBlock]
      // When
      const xformedBlockArray = xformBlockArray(blockArray)
      // Then
      xformedBlockArray.forEach(block => {
        const expectedProps = ['blockHash', 'timestamp', 'numActions', 'rawBlockData']
        expectedProps.forEach(expectedProp => {
          assert(block[expectedProp] !== undefined, 'A block doesn\'t include the property [' + expectedProp + ']')
        })

        assert(_isEqual(block.rawBlockData, mockBlock), 'rawBlockData was not moved (completely) to new location in object')
      })

    })
  })
})
