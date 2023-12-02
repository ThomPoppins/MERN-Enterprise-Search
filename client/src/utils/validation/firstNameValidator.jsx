const isAllLettersOrDotOrWhitespace = (str) => /^[a-zA-Z.\s]+$/u.test(str)

const firstNameValidator = (name) =>
  name.length >= 1 && isAllLettersOrDotOrWhitespace(name)

export default firstNameValidator
