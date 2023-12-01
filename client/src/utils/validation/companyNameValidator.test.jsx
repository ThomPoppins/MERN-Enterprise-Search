import companyNameValidator from './companyNameValidator'

describe('companyNameValidator', () => {
  it('returns true for valid company names', () => {
    expect(companyNameValidator('Acme Inc.')).toBe(true)
    expect(companyNameValidator('123 Company')).toBe(true)
    expect(companyNameValidator('Company Name')).toBe(true)
    expect(companyNameValidator('Company-Name')).toBe(true)
    expect(companyNameValidator('Company Name Ltd.')).toBe(true)
    expect(companyNameValidator("Company's Name")).toBe(true)
  })

  it('returns false for invalid company names', () => {
    expect(companyNameValidator('')).toBe(false)
    expect(companyNameValidator('Company Name!')).toBe(false)
    expect(companyNameValidator('Company Name@')).toBe(false)
    expect(companyNameValidator('Company Name#')).toBe(false)
    expect(companyNameValidator('Company Name$')).toBe(false)
    expect(companyNameValidator('Company Name%')).toBe(false)
    expect(companyNameValidator('Company Name^')).toBe(false)
    expect(companyNameValidator('Company Name&')).toBe(false)
    expect(companyNameValidator('Company Name*')).toBe(false)
    expect(companyNameValidator('Company Name(')).toBe(false)
    expect(companyNameValidator('Company Name)')).toBe(false)
    expect(companyNameValidator('Company Name_')).toBe(false)
    expect(companyNameValidator('Company Name+')).toBe(false)
    expect(companyNameValidator('Company Name=')).toBe(false)
    expect(companyNameValidator('Company Name{')).toBe(false)
    expect(companyNameValidator('Company Name}')).toBe(false)
    expect(companyNameValidator('Company Name[')).toBe(false)
    expect(companyNameValidator('Company Name]')).toBe(false)
    expect(companyNameValidator('Company Name|')).toBe(false)
    expect(companyNameValidator('Company Name\\')).toBe(false)
    expect(companyNameValidator('Company Name;')).toBe(false)
    expect(companyNameValidator('Company Name:')).toBe(false)
    expect(companyNameValidator('Company Name"')).toBe(false)
    expect(companyNameValidator('Company Name<')).toBe(false)
    expect(companyNameValidator('Company Name>')).toBe(false)
    expect(companyNameValidator('Company Name,')).toBe(false)
    expect(companyNameValidator('Company Name/')).toBe(false)
    expect(companyNameValidator('Company Name?')).toBe(false)
    expect(companyNameValidator('Company Name`')).toBe(false)
    expect(companyNameValidator('Company Name~')).toBe(false)
    expect(
      companyNameValidator('Company Name!@#$%^&*()_+={}[]|\\;:\'",.<>?/`~'),
    ).toBe(false)
    expect(
      companyNameValidator(
        'Company Name With Long Name More Than Sixty Characters And some more letters to make the test valid',
      ),
    ).toBe(false)
  })
})
