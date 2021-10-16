const { printTable, Table } = require('console-table-printer');
const { warn, WARN, info, INFO, error, ERROR, success, SUCCESS } = require('../utils/logging')
const { findUserName, findUnpaidUsers, findIncomeNotEnteredUsers } = require('../helper')

module.exports = (incomeBySource, allUsers) => {
  if(Object.keys(incomeBySource).length > 0){
    info('Income in the current interval by income source')
  }
  else{
    warn('No incomes have been entered for this interval')
  }

  Object.keys(incomeBySource).forEach( userId => {
    const incomeSources = incomeBySource[userId]
    const totalIncome = Object.values(incomeSources).reduce((partialSum, a) => partialSum + a,0)
    const icTable = new Table({
      columns: [
        { name:'uname', title:findUserName(allUsers,userId) + ' - $' + totalIncome},
      ],
    })
    Object.keys(incomeSources).forEach( incomeSource => {
      icTable.addRow({ uname: incomeSource + ' - $' + incomeSources[incomeSource] })
    })
    icTable.printTable()
  })
}

