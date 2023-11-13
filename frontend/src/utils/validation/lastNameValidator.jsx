const isAllLettersOrWhitespace = (str) => {
  return /^[a-zA-Z\s]+$/.test(str)
}

const lastNameValidator = (lastName) => {
  return lastName.length >= 1 && isAllLettersOrWhitespace(lastName)
}

export default lastNameValidator
