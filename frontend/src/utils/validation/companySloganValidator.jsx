// Validate company slogan to be alphanumeric, white spaces, special characters and can't be empty.
// Also slogan string can not be only white spaces
function companySloganValidator(slogan) {
  const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/

  return slogan.trim().length > 0 && slogan.length <= 90 && regex.test(slogan)
}

export default companySloganValidator
