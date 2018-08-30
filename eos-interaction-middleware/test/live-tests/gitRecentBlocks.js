const assert = require('assert')

describe('Middlware endpoint: confirm contract with live API', function () {
  describe('getRecentBlocks()', function () {
    const recentBlocksProvider = require('../../providers/recentBlocksProvider')
    it('should return an array of 10 items', function (done) {
      recentBlocksProvider.get().then(resp => {
        assert(Array.isArray(resp), 'returned value from BlockProvider is not an array.')
        assert(resp.length === 10, 'returned value from BlockProvider does not have the required 10 blocks')
        done()
      }).catch(err => {
        done(err)
      })
    }).timeout(8000)
  })
})
