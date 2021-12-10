const { patchNewIntAmount } = require('../api_patch')
const { mockPatchNewIntAmount } = require('../mocks')

describe('patchNewIntAmount', () => {
  it('updates the amount of the interval specified', async () => {
    const mockIntId = 5
    const newAmount = 99
    mockPatchNewIntAmount(mockIntId)
    const responseStatus = await patchNewIntAmount(newAmount, mockIntId)
    expect(responseStatus).toEqual(204)
  })
})
