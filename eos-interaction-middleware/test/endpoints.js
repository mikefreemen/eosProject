const assert = require('assert')

const recentBlocksProvider = require('../providers/recentBlocksProvider')

describe('Middlware endpoints', function () {
  describe('getRecentBlocks()', function () {
    it('should return an array of 10 items', function (done) {
      recentBlocksProvider.get().then(resp => {
        console.log('getting recent blocks back:')
        console.log(resp)
        assert(Array.isArray(resp))
        assert(resp.length === 10)
        done()
      })
    })
  })
})
