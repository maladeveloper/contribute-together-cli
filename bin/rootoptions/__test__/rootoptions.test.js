const optionCurrentIntervalStatus = require('../current_interval_status')
const optionIntervalStatus = require('../interval_status')

jest.setTimeout(300000)

describe('optionCurrentIntervalStatus', () => {
  it('does not crash', async () => {
    await optionCurrentIntervalStatus()
  })
})

describe('optionIntervalStatus', () => {
  it('does not crash', async () => {
    const intervalId = 5
    await optionIntervalStatus(intervalId)
  })
})
