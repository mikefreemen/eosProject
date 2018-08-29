const assert = require('assert')

const recentBlocksProvider = require('../providers/recentBlocksProvider')

describe('Middlware endpoints', function () {
  describe('getRecentBlocks()', function () {
    it('should return an array of 10 items', function (done) {
      recentBlocksProvider.get().then(resp => {
        assert(Array.isArray(resp), 'returned value from BlockProvider is not an array.')
        assert(resp.length === 10, 'returned value from BlockProvider does not have the required 10 blocks')
        done()
      }).catch(err => {
        done(err)
      })
    }).timeout(8000)

    it('each block should contain the expected fields', function (done) {
      recentBlocksProvider.get().then(blockArray => {
        blockArray.forEach(block => {
          const expectedProps = ['blockHash', 'timestamp', 'numActions', 'rawBlockData']
          expectedProps.forEach(expectedProp => {
            if( block[expectedProp] === undefined ) {
              console.log(`following block lacks prop[${expectedProp}]`)
              console.log(block)
            }
            assert(block[expectedProp] !== undefined, 'A block doesn\'t include the property [' + expectedProp + ']')
          })
        })
        done()
      }).catch(err => {
        done(err)
      })
    }).timeout(8000)
      
  })
})
