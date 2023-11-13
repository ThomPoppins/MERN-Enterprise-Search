// Validate company description input to be at least 1 character long,
// contain alphanumeric characters, special characters and be up to 280 characters long.
// Also description string can not be only white spaces.
function companyDescriptionValidator(description) {
  const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/

  return description.trim().length > 0 && description.length <= 280 && regex.test(description)
}

export default companyDescriptionValidator
