export default function companyNameValidator(name) {
  const nameRegex = /^[a-zA-Z0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/u
  return nameRegex.test(name) && !name.includes('"')
}
