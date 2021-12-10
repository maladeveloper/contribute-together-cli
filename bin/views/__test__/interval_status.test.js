const viewIntervalStatus = require('../interval_status.js')

const payload = {
  allUsers: [
    { id: 'ANU0001', name: 'Anuratha Srikumar' },
    { id: 'MAI0001', name: 'Maiyuren Srikumar' },
    { id: 'MAL0001', name: 'Malavan Srikumar' },
    { id: 'SUP0001', name: 'Suppiah Srikumar' }
  ],
  tax: { ANU0001: 36, MAI0001: 84, MAL0001: 807, SUP0001: 173 },
  payments: [{ id: 3, interval: 5, user: 'ANU0001', amount: 432 }],
  incomeBySource: {
    ANU0001: { 'Medical Centre': 795 },
    MAI0001: {
      PhD: 1195,
      'Tax Returns': 1895,
      Tutor: 150,
      'University Tutor': 1635
    },
    MAL0001: { Zendesk: 3780 },
    SUP0001: { 'Gift Packaging': 1752 }
  },
  incomeAveraged: { ANU0001: 795, MAI0001: 1218.75, MAL0001: 3780, SUP0001: 1752 }
}

describe('when the standard inputs are passed', () => {
  test('it does not crash', async () => {
    viewIntervalStatus(payload)
  })
})

describe('when all users had paid', () => {
  test('it does not crash', async () => {
    const allPaidPayload = {
      ...payload,
      payments: [
        { id: 3, interval: 5, user: 'ANU0001', amount: 432 },
        { id: 3, interval: 5, user: 'MAI0001', amount: 432 },
        { id: 3, interval: 5, user: 'MAL0001', amount: 432 },
        { id: 3, interval: 5, user: 'SUP0001', amount: 432 }
      ]
    }
    viewIntervalStatus(allPaidPayload)
  })
})

describe('when no users have paid', () => {
  test('it does not crash', async () => {
    const allPaidPayload = {
      ...payload,
      payments: []
    }
    viewIntervalStatus(allPaidPayload)
  })
})

describe('when no income has been provided for this interval', () => {
  test('it does not crash', async () => {
    const allPaidPayload = {
      ...payload,
      incomeBySource: {}
    }
    viewIntervalStatus(allPaidPayload)
  })
})

describe('when no income provided for the last 2 intervals', () => {
  test('it does not crash', async () => {
    const allPaidPayload = {
      ...payload,
      incomeAveraged: {},
      incomeBySource: {}
    }
    viewIntervalStatus(allPaidPayload)
  })
})
