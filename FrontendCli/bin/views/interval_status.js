const { printTable, Table } = require('console-table-printer');
const { warn, WARN, info, INFO, error, ERROR, success, SUCCESS } = require('../utils/logging')
const { findUserName, findUnpaidUsers, findIncomeNotEnteredUsers } = require('../helper')
const showIncomeByIncomeSources = require('../views/income_by_source')

const showTaxDue = (tax, allUsers) => {
  info("The tax due for this interval -")
  const taxTable = new Table({
    columns: [
      { name:'uname', title:'Name'},
      { name:'adue', title:'Tax Due ($)'}
    ],
  })
  Object.keys(tax).forEach( userId => {
    taxTable.addRow({ uname: findUserName(allUsers, userId), adue: tax[userId]})
  })
  taxTable.printTable()
}

const showPayments = (payments, allUsers) => {
  if(payments.length > 0){
    success("Payments which have been made - ")
    paymentTableData =payments.map( payment => {
      return {'Name':findUserName(allUsers, payment.user), 'Amount ($)':payment.amount}
    })
    printTable(paymentTableData)
  }
}

const showUnpaidUsers = (payments, allUsers) => {
  unpaidUsers = findUnpaidUsers(allUsers, payments)
  unpaidUserNames = unpaidUsers.map(userId => findUserName(allUsers, userId))
  if(unpaidUsers.length > 0){
    warn('The unpaid users - ' +  unpaidUserNames.join(', ')+ '.') 
  }else{
    success('All users have paid.')
  }
}


const showAveragedIncome = (incomeAveraged, allUsers) => {
  if(Object.keys(incomeAveraged).length > 0){
    info('Averaged income across the 2 latest intervals-')
    const aiTable = new Table({
      columns: [
        { name:'uname', title:'Name'},
        { name:'amount', title:'Amount ($)'}
      ],
    })
    Object.keys(incomeAveraged).forEach( userId => {
      aiTable.addRow({ uname: findUserName(allUsers, userId), amount: incomeAveraged[userId]})
    })
    aiTable.printTable()
  }      
}

module.exports = (payload) => {
  const { allUsers, tax, payments, incomeBySource, incomeAveraged} = payload
  const incomeNotEnteredUsers  = findIncomeNotEnteredUsers(allUsers, incomeBySource)

  if(incomeNotEnteredUsers.length === 0 ){
    showPayments(payments, allUsers) 
    showUnpaidUsers(payments, allUsers)
    showIncomeByIncomeSources(incomeBySource, allUsers)
    showAveragedIncome(incomeAveraged, allUsers)
    showTaxDue(tax, allUsers)
  }
  else{
    const incomeNotEnteredNames  = incomeNotEnteredUsers.map(userId => findUserName(allUsers, userId))
    error(`Status cannot be shown as the following users have not entered their income - ${incomeNotEnteredNames.join(', ')}.`)
  }
}
