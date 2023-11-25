import express from 'express'
import { Company } from '../models/companyModel.js'
import apiLimiter from '../middleware/rate-limiter/apiLimiter.js'

const router = express.Router()

// TODO: Add more fields for companies to match on in the search results
// Route to find companies by name and industry.
router.get('/experts/:searchTerm', apiLimiter, async (request, response) => {
  try {
    const { searchTerm } = request.params

    if (!searchTerm) {
      return response.status(200).json([])
    }

    const companies = await Company.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { industry: { $regex: searchTerm, $options: 'i' } },
      ],
    })

    if (!companies) {
      return response.status(200).json([])
    }

    return response.status(200).send({
      count: companies.length,
      results: companies,
    })
  } catch (error) {
    console.log(error)
    return response.status(500).json({ message: 'Error finding experts' })
  }
})

export default router
