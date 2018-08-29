const assert = require('assert')

const recentBlocksProvider = require('../providers/recentBlocksProvider')

describe('Middlware endpoints', function () {
  describe('getRecentBlocks()', function () {
    it('should return an array of 10 items', function (done) {
      recentBlocksProvider.get().then(resp => {
        // console.log('getting recent blocks back:')
        // console.log(resp)
        assert(Array.isArray(resp), 'returned value from BlockProvider is not an array.')
        assert(resp.length === 10, 'returned value from BlockProvider does not have the required 10 blocks')
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('each block should contain the expected fields', function (done) {
      recentBlocksProvider.get().then(blockArray => {
        blockArray.forEach(block => {
          console.log('block:')
          // console.log(block)
          const keys = Object.keys(block)
          const expectedFields = ['blockId', 'timestamp', 'transactions']
          expectedFields.forEach(prop => {
            assert(blockArray.includes(prop), 'A block doesn\'t include the property [' + prop + ']')
          })
        done()
        })
      }).catch(err => {
        done(err)
      })
    })
      
  })
})
