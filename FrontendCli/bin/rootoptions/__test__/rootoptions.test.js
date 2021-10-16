const optionCurrentIntervalStatus = require('../current_interval_status')
const optionIntervalStatus = require('../interval_status')
const { restartServer, PORT, turnOffServer} = require('../../utils/api')

jest.setTimeout(300000)

describe('optionCurrentIntervalStatus', () => {
  it('does not crash', async () => {
    await restartServer()
    await optionCurrentIntervalStatus()
  })
})

describe('optionIntervalStatus', () => {
  it('does not crash', async () => {
    const intervalId = 5
    await restartServer()
    await optionIntervalStatus(intervalId)
  })
})
