const { getIntervals, getTaxByInterval, getAllUsers, getIncomeSourcesByUser, getPaymentByInterval, getIncByIntWithSources, getIncByIntAveraged } = require('../api_get.js')

const expectATaxObj = (taxes) => {
  expect(typeof taxes).toBe('object')
  Object.keys(taxes).forEach(user => {
    expect(user.length).toEqual(7)
    expect(typeof user).toBe('string')
  })
  Object.values(taxes).forEach(amount => {
    expect(typeof amount).toBe('number')
  })
}

const expectPaymentsArr = (payments) => {
  expect(Array.isArray(payments)).toBe(true)
  payments.forEach(payment => {
    expect(payment.user.length).toEqual(7)
    expect(typeof payment.user).toBe('string')
    expect(typeof payment.id).toBe('number')
    expect(typeof payment.amount).toBe('number')
    expect(typeof payment.interval).toBe('number')
  })
}

jest.setTimeout(300000)

describe('getAllUsers', () => {
  it('should return a object with correct keys', async () => {
    const users = await getAllUsers()
    expect(Array.isArray(users)).toBe(true)
    users.forEach(user => {
      expect(typeof user.id).toBe('string')
      expect(user.id.length).toBe(7)
    })
  })
})

describe('getIntervals', () => {
  it('should return the intervals', async () => {
    const intervals = await getIntervals()
    expect(Array.isArray(intervals)).toBe(true)
    intervals.forEach((interval) => {
      expect(Object.keys(interval).sort()).toEqual(['start_date', 'end_date', 'id'].sort())
      expect(typeof interval.id).toBe('number')
      expect(typeof interval.start_date).toBe('string')
      expect(typeof interval.end_date).toBe('string')
      expect(interval.start_date.length).toEqual(10)
      expect(interval.end_date.length).toEqual(10)
    })
  })
})

describe('getIncomeSourcesByUser', () => {
  it('should return the income sources', async () => {
    const userId = 'MAL0001'
    const incomeSources = await getIncomeSourcesByUser(userId)
    expect(typeof incomeSources).toBe('object')
    incomeSources.forEach(source => {
      expect(typeof source.id).toBe('string')
      expect(typeof source.name).toBe('string')
    })
  })
})

describe('getPaymentByInterval', () => {
  it('should return the payment object', async () => {
    const intervalId = '5'
    const payment = await getPaymentByInterval(intervalId)
    expectPaymentsArr(payment)
  })
})

describe('getTaxByInterval', () => {
  it('should return a object with correct keys', async () => {
    const taxes = await getTaxByInterval(5)
    expectATaxObj(taxes)
  })
})

describe('getIncByIntWithSources', () => {
  it('should return the income of a user with their sources', async () => {
    const incomes = await getIncByIntWithSources(5)
    expect(typeof incomes).toBe('object')
    Object.keys(incomes).forEach(user => {
      expect(user.length).toEqual(7)
      expect(typeof user).toBe('string')
    })
    Object.values(incomes).forEach(sourceObj => {
      expect(typeof sourceObj).toBe('object')
    })
  })
})

describe('getIncByIntAveraged', () => {
  it('should return the income of a user with their sources', async () => {
    const incomes = await getIncByIntAveraged(5)
    expectATaxObj(incomes)
  })
})
