import express from 'express'
import { Image } from '../models/imageModel.js'
import { getStaticFileURLFromPath } from '../middleware/files/staticFiles.js'
import mongoose from 'mongoose'

const router = express.Router()

// Route to get URL for image document
router.get('/image-url/:id', async (request, response) => {
  try {
    const objectId = new mongoose.Types.ObjectId(request.params.id)

    // Get the image document from the database
    const imageDocument = await Image.findById(objectId)

    // If the image document is not found, send a 404 response
    if (!imageDocument) {
      return response.status(404).send({ message: 'Image not found' })
    }

    // Get the URL for the image document
    const imageURL = getStaticFileURLFromPath(imageDocument.path)

    // Send the URL to the client
    return response.status(200).send({ imageURL })
  } catch (error) {
    console.log('Error in GET /images/:id: ', error)
    // If the error is a 400 error, send a 400 response with the error message
    if (error instanceof mongoose.Error.CastError) {
      return response.status(400).send({ message: error.message })
    }
    // Else, send a 500 response with the error message
    return response.status(500).send({ message: error.message })
  }
})

export default router
