import { getKvkData } from '../controllers/kvkController.js'
import express from 'express'
import cors from 'cors'

const router = express.Router()

// GET route to get KvK data from the KvK API by KvK number
router.get('/', cors(), getKvkData)

export default router
