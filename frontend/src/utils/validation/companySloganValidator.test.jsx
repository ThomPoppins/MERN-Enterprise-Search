import companySloganValidator from './companySloganValidator'

describe('companySloganValidator', () => {
  it('returns true for valid slogans', () => {
    expect(companySloganValidator('')).toBe(false)
    expect(companySloganValidator('A slogan')).toBe(true)
    expect(companySloganValidator('A slogan with spaces')).toBe(true)
    expect(companySloganValidator('A slogan with punctuation!')).toBe(true)
    expect(companySloganValidator('A slogan with numbers 123')).toBe(true)
    expect(
      companySloganValidator('A slogan with special characters @#$%^&*()_+'),
    ).toBe(true)
    expect(
      companySloganValidator('A slogan with all valid characters!@#$%^&*()_+'),
    ).toBe(true)
    expect(
      companySloganValidator('A slogan with exactly 90 characters!@#$%^&*()_+'),
    ).toBe(true)
  })

  it('returns false for invalid slogans', () => {
    expect(
      companySloganValidator(
        'A slogan with more then 90 characters!@#$%^&*()_A slogan with more then 90 characters!@#$%^&*()_',
      ),
    ).toBe(false)
  })
})
