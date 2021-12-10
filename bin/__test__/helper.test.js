const { findUnpaidUsers, findUserName, findIncomeNotEnteredUsers } = require('../helper.js')

describe('findUnpaidUsers', () => {
  describe('when there are users who have not paid', () => {
    const payments = [{ id: 3, interval: 5, user: 'ANU0001', amount: 432 }]
    const allUsers = [
      { id: 'ANU0001', name: 'Anuratha Srikumar' },
      { id: 'MAI0001', name: 'Maiyuren Srikumar' },
      { id: 'MAL0001', name: 'Malavan Srikumar' },
      { id: 'SUP0001', name: 'Suppiah Srikumar' }
    ]
    it('returns the users who have not paid', () => {
      const unpaidUsers = findUnpaidUsers(allUsers, payments)
      expect(unpaidUsers).toEqual(['MAL0001', 'SUP0001', 'MAI0001'].sort())
    })
  })
})

describe('findUserName', () => {
  describe('when there are users who have not paid', () => {
    const userId = 'MAL0001'
    const allUsers = [
      { id: 'ANU0001', name: 'Anuratha Srikumar' },
      { id: 'MAI0001', name: 'Maiyuren Srikumar' },
      { id: 'MAL0001', name: 'Malavan Srikumar' },
      { id: 'SUP0001', name: 'Suppiah Srikumar' }
    ]
    it('returns the users who have not paid', () => {
      const name = findUserName(allUsers, userId)
      expect(name).toEqual('Malavan Srikumar')
    })
  })
})
describe('findIncomeNotEnteredUsers', () => {
  describe('when there are users who have not entered their income', () => {
    const allUsers = [
      { id: 'ANU0001', name: 'Anuratha Srikumar' },
      { id: 'MAI0001', name: 'Maiyuren Srikumar' },
      { id: 'MAL0001', name: 'Malavan Srikumar' },
      { id: 'SUP0001', name: 'Suppiah Srikumar' }
    ]
    const incomeBySource = {
      ANU0001: { 'Medical Centre': 795 },
      MAI0001: {
        PhD: 1195,
        'Tax Returns': 1895,
        Tutor: 150,
        'University Tutor': 1635
      },
      SUP0001: { 'Gift Packaging': 1752 }
    }

    it('finds the users who have not entered their income', () => {
      const incomeNotEnteredUsers = findIncomeNotEnteredUsers(allUsers, incomeBySource)
      expect(incomeNotEnteredUsers).toEqual(['MAL0001'])
    })
  })
})
