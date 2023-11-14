const emailValidator = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
  return regex.test(email)
}

export default emailValidator
