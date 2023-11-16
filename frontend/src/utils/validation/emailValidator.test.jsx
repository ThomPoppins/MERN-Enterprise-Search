import emailValidator from './emailValidator'

describe('emailValidator', () => {
  it('returns true for valid emails', () => {
    expect(emailValidator('')).toBe(false)
    expect(emailValidator('test@example.com')).toBe(true)
    expect(emailValidator('test.email@example.com')).toBe(true)
    expect(emailValidator('test+email@example.com')).toBe(true)
    expect(emailValidator('test.email+email@example.com')).toBe(true)
    expect(emailValidator('test.email+email@example.co.uk')).toBe(true)
  })

  it('returns false for invalid emails', () => {
    expect(emailValidator('test')).toBe(false)
    expect(emailValidator('test@')).toBe(false)
    expect(emailValidator('test@example')).toBe(false)
    expect(emailValidator('test@example.')).toBe(false)
    expect(emailValidator('test@.com')).toBe(false)
    expect(emailValidator('test@.example.com')).toBe(false)
    expect(emailValidator('test@exam ple.com')).toBe(false)
    expect(emailValidator('test@example.com ')).toBe(false)
  })
})
