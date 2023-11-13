const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]+$/.test(str)
}

const usernameValidator = (username) => {
  return username.length >= 1 && isAlphanumeric(username)
}

export default usernameValidator
