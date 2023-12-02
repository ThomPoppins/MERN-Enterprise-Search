import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const TEST_KVK_API = import.meta.env.VITE_TEST_KVK_API

const kvkNumberValidator = async (kvkNumber) => {
  const regex = /^[0-9]{8}$/u
  const validNumberFormat = regex.test(kvkNumber)
  let apiCallValidated = false

  if (!validNumberFormat) {
    return false
  }
  if (!TEST_KVK_API) {
    return validNumberFormat
  }

  // TODO: Remove this line when API call is implemented
  await axios
    .get(`${BACKEND_URL}/kvk`, {
      params: {
        kvkNumber,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('kvkNumberValidator Axios response: ', response)
        apiCallValidated = true
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        apiCallValidated = false
        return false
      }
      console.log(
        'ERROR from kvkNumberValidator Axios call to backend: ',
        error,
      )
    })

  return validNumberFormat && apiCallValidated
}

export default kvkNumberValidator
