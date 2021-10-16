const find = require('find-process')
const kill = require('kill-port')
const { restartServer, PORT, turnOffServer } = require('../api.js')
jest.setTimeout(300000)
describe('restartServer', () => {
  it('turns on server when it is off', async () => {
    await turnOffServer()
    await restartServer()
    const list = await new Promise((res) => setTimeout(async () => { const list = await find('port', PORT); res(list) }, 1000))
    expect(Array.isArray(list)).toBe(true)
    await turnOffServer()
  })

  it('does nothing when server is already on', async () => {
    await restartServer()
    await restartServer()
    const list = await new Promise((res) => setTimeout(async () => { const list = await find('port', PORT); res(list) }, 1000))
    const pid = list[0].pid
    await restartServer()
    const new_list = await new Promise((res) => setTimeout(async () => { const list = await find('port', PORT); res(list) }, 1000))
    const new_pid = new_list[0].pid
    expect(pid).toEqual(new_pid)
    await kill(PORT, 'tcp')
  })
})

describe('turnOffServer', () => {
  it('turns off the server when it is on', async () => {
    await restartServer()
    await turnOffServer()
    const list = await find('port', PORT)
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toEqual(0)
  })
  it('does nothing when server is already off', async () => {
    await turnOffServer()
    await turnOffServer()
    const list = await new Promise((res) => setTimeout(async () => { const list = await find('port', PORT); res(list) }, 1000))
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toEqual(0)
  })
})
