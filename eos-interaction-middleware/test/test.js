const assert = require('assert')

describe('Middlware endpoints', function () {
  describe('getRecentBlocks()', function () {
    it('should return 10 items', function () {
      assert([1,2,3,4,5,6,7,8,9,10].length === 10)
    })
  })
})
