const companyProfessionsInputValidator = (professionsInput) =>
  (professionsInput.length >= 1 && /^[a-zA-Z, ]+$/u.test(professionsInput)) ||
  professionsInput.length === 0

export default companyProfessionsInputValidator
