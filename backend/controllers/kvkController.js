import axios from "axios";
import fs from "fs";
import https from "https";
import { KVK_TEST_API_KEY } from "../config.js";

const PATH_TO_KVK_API_CERTIFICATE_CHAIN_RELATIVE_TO_INDEX_APP =
  "./certs/kvkApi/Private_G1_chain.pem";

// Function to get data from the KVK API
export const getKvkData = async (request, response) => {
  try {
    // Get the query from the request query parameters
    const { kvkNumber } = request.query;

    // Get the certificate chain from the file system
    const certificateChain = fs.readFileSync(
      PATH_TO_KVK_API_CERTIFICATE_CHAIN_RELATIVE_TO_INDEX_APP,
      "utf8"
    );

    const agent = new https.Agent({
      ca: certificateChain,
    });

    // Get the data from the KVK API
    const { data } = await axios.get(
      `https://api.kvk.nl/test/api/v1/naamgevingen/kvknummer/${kvkNumber}`,
      {
        headers: {
          apikey: KVK_TEST_API_KEY,
        },
        httpsAgent: agent,
      }
    );

    // Send status 200 response and the data to the client
    return response.status(200).json(data);
  } catch (error) {
    console.log("Error in GET /kvk: ", error);
    if (error.response.status === 400) {
      response.status(400).send({ message: error.message });
    } else {
      response.status(500).send({ message: error.message });
    }
  }
};
