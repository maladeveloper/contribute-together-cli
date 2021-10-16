const promptAddIncomeUser = require('../add_income')
const prompts = require('prompts')
const intervalId = '5'
const { mockPostNewIncome } = require('../../utils/mocks')

jest.setTimeout(3000)
it('adds an income', async () => {
  mockPostNewIncome()
  prompts.inject(['MAL0001', '2021-10-16 09:41:54', -1, '11', -1])
  await promptAddIncomeUser(intervalId)
})
