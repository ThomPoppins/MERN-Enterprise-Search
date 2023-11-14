const isAllLettersOrDotOrWhitespace = (str) => /^[a-zA-Z.\s]+$/.test(str)

const firstNameValidator = (name) => name.length >= 1 && isAllLettersOrDotOrWhitespace(name)

export default firstNameValidator
