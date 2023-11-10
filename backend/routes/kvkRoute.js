// import { KVK_TEST_API_KEY } from '../config.js'
import { getKvkData } from '../controllers/kvkController.js'
import express from 'express'
// import fs from 'fs'
// import axios from 'axios'
// import https from 'https'
import cors from 'cors'

// const PATH_TO_KVK_API_CERTIFICATE_CHAIN_RELATIVE_TO_INDEX_APP =
//   './certs/kvkApi/Private_G1_chain.pem'

const router = express.Router()

// Route to get data from the KVK API
// Route to get one user from database using the user's id
router.get('/', cors(), getKvkData)

export default router
