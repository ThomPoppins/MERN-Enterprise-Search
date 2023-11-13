const isAllLettersOrDotOrWhitespace = (str) => {
  return /^[a-zA-Z.\s]+$/.test(str)
}

const firstNameValidator = (name) => {
  return name.length >= 1 && isAllLettersOrDotOrWhitespace(name)
}

export default firstNameValidator
