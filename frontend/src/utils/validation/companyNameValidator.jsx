export default function companyNameValidator(name) {
  const nameRegex = /^[a-zA-Z0-9\s\-\'\.]{1,60}$/
  return nameRegex.test(name) && !name.includes('"')
}
