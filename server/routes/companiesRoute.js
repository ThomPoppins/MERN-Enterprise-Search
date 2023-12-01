import express from 'express'
import { Company } from '../models/companyModel.js'
import { Image } from '../models/imageModel.js'
import { Profession } from '../models/professionModel.js'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import apiLimiter from '../middleware/rate-limiter/apiLimiter.js'

const router = express.Router()

/*
 * TODO: [MERNSTACK-112] Remove this function once the payment model has been fully implemented.
 * Generate a random payment id using the uuidv4 function.
 */
const generateRandomId = () => {
  const paymentId = uuidv4()
  return paymentId
}

// Route to save a new Company
router.post('/', apiLimiter, async (request, response) => {
  // Create a new company document using the Company model
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.phone ||
      !request.body.kvkNumber ||
      !request.body.startYear ||
      !request.body.owners
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message:
          'Data fields missing, need at least a company name, company owner and a start year.',
      })
    }

    // Check if the company already exists in the database using the kvkNumber
    const existingCompanyKvk = await Company.findOne({
      kvkNumber: request.body.kvkNumber,
    })
    if (existingCompanyKvk) {
      // Send status 409 response if the company already exists and a (error) message to inform the client.
      return response.status(409).send({
        message: 'Company with this KVK number already exists.',
      })
    }

    let logoImageDocument = {}

    if (request.body.logoId) {
      const logoObjectId = new mongoose.Types.ObjectId(request.body.logoId)

      // Get company logo image document
      logoImageDocument = await Image.findOne({ _id: logoObjectId })
        .then((document) => document)
        .catch((error) => {
          console.log('Error in GET /companies: ', error)
        })
    }

    const professionsObjectIds = request.body.professionsIds.map(
      (professionId) => new mongoose.Types.ObjectId(professionId),
    )

    // Create a new company document using the Company model and the properties from the request body.
    const newCompany = {
        name: request.body.name,
        logoId: request.body.logoId,
        logoUrl: logoImageDocument.url ? logoImageDocument.url : null,
        email: request.body.email,
        phone: request.body.phone,
        kvkNumber: request.body.kvkNumber,
        slogan: request.body.slogan,
        description: request.body.description,
        professionsIds: professionsObjectIds,
        startYear: request.body.startYear,
        owners: request.body.owners,
        payments: request.body.payments
          ? request.body.payments
          : [
              {
                id: generateRandomId(),
              },
            ],
      },
      // Create a new company document using the Company model and the properties from the request body
      company = await Company.create(newCompany)

    // Send status 201 response and the newly created company to the client
    return response.status(201).send(company)
  } catch (error) {
    console.log('Error in POST /companies: ', error)
    return response.status(500).send({ message: error.message })
  }
})

// Route to get all companies
router.get('/', apiLimiter, async (request, response) => {
  try {
    // Get all company documents using the Company model's find method
    const companies = await Company.find({})

    // Send status 200 response and the companies to the client
    return response.status(200).json({
      count: companies.length,
      data: companies,
    })
  } catch (error) {
    console.log('Error in GET /companies: ', error)
    return response.status(500).send({ message: error.message })
  }
})

// Get profession by profession name
router.get(
  '/professionId/:professionName',
  apiLimiter,
  async (request, response) => {
    const { professionName } = request.params

    try {
      const profession = await Profession.findOne({ name: professionName })

      if (!profession) {
        return response.status(400).json({})
      }
      return response.status(200).json(profession)
    } catch (error) {
      console.log('Error in GET /professionId: ', error)
      return response.status(500).send({ message: error.message })
    }
  },
)

// Route to save a new profession
router.post('/profession', apiLimiter, async (request, response) => {
  console.log('request.body POST profession: ', request.body)
  console.log('request.body.name POST profession: ', request.body.name)

  try {
    if (!request.body.name) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message: 'Data fields missing, need at least a profession name.',
      })
    }

    const professionName = request.body.name.trim()

    // Check if the profession already exists in the database using the name
    const existingProfession = await Profession.findOne({
      name: professionName,
    })
    if (existingProfession) {
      // Send status 409 response if the profession already exists and a (error) message to inform the client.
      return response.status(201).send(existingProfession)
    }

    // Create a new profession document using the Profession model and the properties from the request body.
    const newProfessionData = {
      name: professionName,
    }
    // Create a new profession document using the Profession model and the properties from the request body
    await Profession.create(newProfessionData)
      .then((document) => {
        console.log('new Profession document: ', document)
        const responseData = {
          name: document.name,
          _id: document._id,
          createdAt: document.createdAt,
          updatedAt: document.updatedAt,
        }
        return response.status(201).send(responseData)
      })
      .catch((error) => {
        console.log('Error in POST /profession: ', error)
        return response.status(500).send({ message: error.message })
      })
    // Send status 201 response and the newly created profession to the client
  } catch (error) {
    console.log('Error in POST /profession: ', error)
    return response.status(500).send({ message: error.message })
  }
})

// Route to get all companies from certain owner
router.get(
  '/owned-companies/:ownerUserId',
  apiLimiter,
  async (request, response) => {
    try {
      // Get the  owners' userId from the request parameters
      const { ownerUserId } = request.params,
        // Get all company documents frm
        companies = await Company.find({
          owners: { $elemMatch: { userId: ownerUserId } },
        })

      // Send status 200 response and the companies to the client
      return response.status(200).json({
        count: companies.length,
        data: companies,
      })
    } catch (error) {
      console.log('Error in GET /owned-companies/:ownerUserId ', error)
      return response.status(500).send({ message: error.message })
    }
  },
)

// Route to get one company from database using the company's id
router
  .get('/:id', apiLimiter, async (request, response) => {
    console.log('request.ip', request.ip)
    try {
      // Get the company id from the request parameters
      const { id } = request.params,
        // Get all company documents using the Company model's find method
        company = await Company.findById(id)

      // Send status 200 response and the companies to the client
      return response.status(200).json(company)
    } catch (error) {
      console.log('Error in GET /companies: ', error)
      return response.status(500).send({ message: error.message })
    }
  })

  .get(
    '/:companyId/:userId/isMember',
    apiLimiter,
    async (request, response) => {
      const { companyId, userId } = request.params

      const companyDocument = await Company.findById(companyId)

      if (companyDocument.owners.length > 0) {
        const isMember = companyDocument.owners.some(
          (owner) => owner.userId === userId,
        )

        return response.status(200).json({ isMember })
      }

      return response.status(200).json({ isMember: false })
    },
  )

// Route to update one company in the database using the company's id
router.put('/:id', apiLimiter, async (request, response) => {
  try {
    const { id } = request.params,
      // Check if the company kvkNumber is changed and if it changed, check if the new kvkNumber already exists in the database
      prevCompany = await Company.findById(id).exec()
    if (prevCompany && request.body.kvkNumber !== prevCompany.kvkNumber) {
      const existingCompanyKvk = await Company.findOne({
        kvkNumber: request.body.kvkNumber,
      })
      if (existingCompanyKvk) {
        // Send status 409 response if the company already exists and a (error) message to inform the client.
        return response.status(409).send({
          message: 'Company with this KVK number already exists.',
        })
      }
    }

    // Update the company document using the Company model's findByIdAndUpdate method
    const result = await Company.findByIdAndUpdate(id, request.body)

    // If no company was found, send status 404 response and a (error) message to inform the client.
    if (!result) {
      return response.status(404).json({
        message: `Cannot find company with id=${id}.`,
      })
    }

    return response
      .status(200)
      .send({ message: 'Company updated successfully.' })
  } catch (error) {
    console.log('Error in PUT /companies: ', error)
    return response.status(500).send({ message: error.message })
  }
})

// Route to delete one company from the database using the company's id
router.delete('/:id', apiLimiter, async (request, response) => {
  try {
    const { id } = request.params,
      // Delete the company document using the Company model's findByIdAndDelete method
      result = await Company.findByIdAndDelete(id)

    // If no company was found, send status 404 response and a (error) message to inform the client.
    if (!result) {
      return response.status(404).json({
        message: `Cannot find company with id=${id}.`,
      })
    }

    // Send status 200 response and a (success) message to inform the client the company was deleted successfully
    return response
      .status(200)
      .send({ message: 'Company deleted successfully.' })
  } catch (error) {
    console.log('Error in DELETE /companies: ', error)
    return response.status(500).send({ message: error.message })
  }
})

// Add owner to company based on userId
router.put(
  '/:companyId/add-owner/:userId',
  apiLimiter,
  async (request, response) => {
    try {
      // Get the company id and user id from the request parameters
      const { companyId, userId } = request.params,
        // Find the company document by id
        company = await Company.findById(companyId)

      // If no company was found, send status 404 response and a (error) message to inform the client.
      if (!company) {
        console.log(`Cannot find company with id=${companyId}.`)
        return response.status(404).json({
          message: `Cannot find company with id=${companyId}.`,
        })
      }
      //  If no user id was found, send status 404 response and a (error) message to inform the client.
      const newOwner = {
        userId,
      }

      // If no owners were found, create an empty array
      if (!company.owners) {
        company.owners = []
      }

      // Check if the owner already exists if so send status 409 response and a (error) message to inform the client.
      company.owners.forEach((owner) => {
        if (owner.userId === userId) {
          return response.status(409).json({
            message: `Owner with id=${userId} already exists in company with id=${companyId}.`,
          })
        }
        return owner
      })

      // Add the new owner to the company
      company.owners.push(newOwner)

      // Save the company with the new owner
      const updatedCompany = await company.save()

      // Send status 200 response and the updated company to the client
      return response.status(200).json(updatedCompany)
    } catch (error) {
      console.log('Error in PUT /companies/add-owner/:userId: ', error)
      return response.status(500).send({ message: error.message })
    }
  },
)

// Remove owner from company based on companyId and userId
router.put(
  '/:companyId/remove-owner/:userId',
  apiLimiter,
  async (request, response) => {
    try {
      const { companyId, userId } = request.params,
        company = await Company.findById(companyId)

      if (!company) {
        console.log(`Cannot find company with id=${companyId}.`)
        return response.status(404).json({
          message: `Cannot find company with id=${companyId}.`,
        })
      }

      if (!company.owners) {
        console.log(`Cannot find owners in company with id=${companyId}.`)
        return response.status(404).json({
          message: `Cannot find owners in company with id=${companyId}.`,
        })
      }

      // Filter out the owner with the userId to save the company without the owner
      const updatedOwners = company.owners.filter(
        (owner) => owner.userId !== userId,
      )

      company.owners = updatedOwners

      const updatedCompany = await company.save()

      return response.status(200).json(updatedCompany)
    } catch (error) {
      console.log(
        'Error in PUT /companies/:companyId/remove-owner/:userId: ',
        error,
      )
      return response.status(500).send({ message: error.message })
    }
  },
)

export default router
