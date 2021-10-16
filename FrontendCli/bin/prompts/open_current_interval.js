const prompts = require('prompts')
const promptAddIncomes = require('./add_income')
const optionCurrentIntervalStatus = require('../rootoptions/current_interval_status')
const { getIntervals } = require('../utils/api_get')

const choices = [
  {
    title: 'Done',
    value: -1
  },
  {
    title: 'View Status',
    value: 'viewstatus'
  },
  {
    title: 'Add Incomes',
    value: 'addincomes'
  },
  {
    title: 'Edit Incomes',
    value: 'editincomes'
  },
  {
    title: 'Confirm  Payments',
    value: 'confirmpayments'
  }
]

module.exports = async () => {
  const staticPrompt = {
    type: 'select',
    name: 'oci',
    message: 'Options for the current interval',
    choices
  }

  const currIntId = (await getIntervals())[0].id
  let response

  while (true) {
    response = await prompts(staticPrompt)
    switch (response.oci) {
      case -1:
        return
      case 'viewstatus':
        await optionCurrentIntervalStatus()
        break
      case 'addincomes':
        await promptAddIncomes(currIntId)
        break
      case 'editincomes':
        console.log('Going to edit the incomes')
        break
      case 'confirmpayments':
        console.log('Going to confirm the payments')
        break
    }
  }
}
