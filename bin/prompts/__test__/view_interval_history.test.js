const { getIntervals } = require('../../utils/api_get.js')

const promptViewIntervalHistory = require('../view_interval_history.js')
const prompts = require('prompts')

jest.setTimeout(300000)

it('does not crash', async () => {
  const i_id = (await getIntervals())[0].id
  prompts.inject([i_id.toString(), -1])
  await promptViewIntervalHistory()
})
