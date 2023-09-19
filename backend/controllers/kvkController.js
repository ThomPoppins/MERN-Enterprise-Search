// TODO: [MERNSTACK-191] Export working getKvkData function returning the KVK data in kvkController.js
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

const PATH_TO_KVK_API_CERTIFICATE_CHAIN =
  "../certs/kvkApi/Private_G1_chain.pem";

// Function to get data from the KVK API
export const getKvkData = async (request, response) => {
  try {
    // Get the query from the request query parameters
    const { query } = request.query;

    // TODO: [MERNSTACK-192] Remove this line of code when the KVK API is working in kvkController.js
    const data = fs.readFileSync(PATH_TO_KVK_API_CERTIFICATE_CHAIN, "utf8");

    // Get the data from the KVK API
    // const { data } = await axios.get(
    //   `https://api.kvk.nl/api/v2/testsearch/companies?q=${query}&start=0&rows=10&user_key=${process.env.KVK_API_KEY}`
    // );

    // Send status 200 response and the data to the client
    return response.status(200).json(data);
  } catch (error) {
    console.log("Error in GET /api/kvk: ", error);
    response.status(500).send({ message: error.message });
  }
};
