const isAllLettersOrWhitespace = (str) => /^[a-zA-Z\s]+$/.test(str)

const lastNameValidator = (lastName) => lastName.length >= 1 && isAllLettersOrWhitespace(lastName)

export default lastNameValidator
