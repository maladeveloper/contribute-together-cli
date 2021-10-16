const { getAllUsers, getIncByIntWithSources, getIncomeSourcesByUser } = require('../utils/api_get')
const { postNewIncome } = require('../utils/api_post')
const prompts = require('prompts')
const viewIncomeByIncomeSources = require('../views/income_by_source')

const addIncomeUser = async (intervalId, allUsers, userId) => {
  const incomeSources = await getIncomeSourcesByUser(userId)
  const incomeChoices = incomeSources.map(source => {
    return { title: source.name, value: source.id }
  })
  const addPrompts = [
    {
      type: 'date',
      name: 'date',
      message: 'Pick a date',
      initial: new Date(),
      validate: date => date > Date.now() ? 'Not in the future' : true
    },
    {
      type: 'number',
      name: 'amount',
      message: 'Enter Amount',
      validate: val => {
        if (!val) {
          return 'Must input a value'
        } else if (val < 0) {
          return 'Amount must be greater than 0'
        } else {
          return true
        }
      }
    },
    {
      type: 'select',
      name: 'incomesource',
      message: 'Choose the income source',
      choices: incomeChoices
    }
  ]
  const response = await prompts(addPrompts)
  const postResp = JSON.parse(JSON.stringify(response))
  postResp.date = postResp.date.split('T')[0]
  postResp.incomesource = parseInt(postResp.incomesource)
  await postNewIncome(postResp)
}

module.exports = async (intervalId) => {
  const allUsers = await getAllUsers()
  const choices = [
    {
      title: 'Done',
      value: -1
    }]

  for (const user of allUsers) {
    choices.push({ title: user.name, value: user.id })
  }

  let response
  while (true) {
    const incomeBySourceAll = await getIncByIntWithSources(intervalId)
    viewIncomeByIncomeSources(incomeBySourceAll, allUsers)
    response = await prompts({
      type: 'select',
      name: 'user',
      message: 'Choose a User',
      choices
    })
    if (response.user === -1) {
      return
    } else {
      await addIncomeUser(intervalId, allUsers, response.user)
    }
  }
}
