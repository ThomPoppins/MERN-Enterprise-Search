import axios from 'axios'
import fs from 'fs'
import https from 'https'

const { KVK_TEST_API_KEY } = process.env

const PATH_TO_KVK_API_CERTIFICATE_CHAIN_RELATIVE_TO_INDEX_APP =
  './certs/kvkApi/Private_G1_chain.pem'

// Function to get data from the KVK API
export const getKvkData = async (request, response) => {
  try {
    // Get the query from the request query parameters
    const { kvkNumber } = request.query,
      // Get the certificate chain from the file system
      certificateChain = fs.readFileSync(
        PATH_TO_KVK_API_CERTIFICATE_CHAIN_RELATIVE_TO_INDEX_APP,
        'utf8',
      ),
      // Create an https agent with the certificate chain
      // https://nodejs.org/api/https.html#https_https_request_options_callback
      agent = new https.Agent({
        ca: certificateChain,
      }),
      // Get the data from the KVK API GET request
      { data } = await axios.get(
        `https://api.kvk.nl/test/api/v1/naamgevingen/kvknummer/${kvkNumber}`,
        {
          headers: {
            apikey: KVK_TEST_API_KEY,
          },
          httpsAgent: agent,
        },
      )

    // Send status 200 response and the data to the client
    return response.status(200).json(data)
  } catch (error) {
    console.log('Error in GET /kvk: ', error)
    // If the error is a 400 error, send a 400 response with the error message
    if (error.response.status === 400) {
      return response.status(400).send({ message: error.message })
    }
    // Else, send a 500 response with the error message
    return response.status(500).send({ message: error.message })
  }
}
