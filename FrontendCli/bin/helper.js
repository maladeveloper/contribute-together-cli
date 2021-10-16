
const findUnpaidUsers = (allUsers, payments) => {
  const paidUsers = payments.map( payment => payment.user) 
  const allUsersArr = allUsers.map(user => user.id)
  return allUsersArr.filter(user => !paidUsers.includes(user)).sort()
}

const findUserName = (allUsers, userId) =>{
  const user = allUsers.find(user => user.id == userId)
  return user.name
}

const findIncomeNotEnteredUsers = (allUsers, incomeBySource) => {

  const incomeEnteredUsers = Object.keys(incomeBySource)
  const allUsersArr = allUsers.map(user => user.id)
  return allUsersArr.filter(user => !incomeEnteredUsers.includes(user)).sort()
}

module.exports = { findUnpaidUsers, findUserName, findIncomeNotEnteredUsers }
