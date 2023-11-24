import { Image } from '../models/imageModel.js'
import { getStaticFileURLFromPath } from '../middleware/files/staticFiles.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

const router = express.Router(),
  // Multer disk storage configuration.
  storage = multer.diskStorage({
    // `destination` is the folder where the uploaded file will be stored.
    destination(request, file, callback) {
      callback(null, './public/uploads/images')
    },
    fileFilter(request, file, callback) {
      // eslint-disable-next-line
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        // Send status 400 response if the file is not an image and a (error) message to inform the client.
        return callback(new Error('Only images allowed!'))
      }

      // Image file is accepted. Pass `true` to the callback.
      return callback(null, true)
    },
    // Filename is the name of the uploaded file.
    filename(request, file, callback) {
      // Split the file name and extension.
      const [fileName, fileExtension] = file.originalname.split('.'),
        timestamp = Date.now()
      // e file name to multer.
      callback(null, `${fileName}-${timestamp}.${fileExtension}`)
    },
  }),
  // Create multer instance with the storage configuration.
  upload = multer({ storage })

// POST image upload route, will be in the uploadRoute.js file if it works.
router.post('/image', upload.single('image'), async (request, response) => {
  // If the file upload was successful, the file will be stored in the "uploads/images" folder.
  console.log('REQUEST FILE: ', request.file)

  if (!request.file) {
    console.log('No image file. `request`: ', request)

    return response.status(400).send({
      message: 'No image uploaded.',
    })
  }

  // Prepare response object to send to client with image path and database Image._id.
  const responseObj = {
      message: 'Image uploaded successfully!',
      imagePath: request.file.path,
      url: getStaticFileURLFromPath(request.file.path),
      imageId: new mongoose.Types.ObjectId(),
    },
    // Create Instance of Image model with the image path to safe as docyment in the MongoDB Image collection
    image = new Image({
      path: request.file.path,
      url: getStaticFileURLFromPath(request.file.path),
    })

  // Save new Image document to database
  await image
    .save()
    .then((result) => {
      console.log('Image saved to database!')

      console.log('Result saving image call: ', result)

      responseObj.imageId = result._id
    })
    .catch((error) => {
      console.log('Error saving image to database: ', error)

      // TOGOLIVE: [MERNSTACK-260] Remove error message to the frontend before going into production
      return response.status(500).send({
        message: `Error saving image to database! ${error.message}`,
      })
    })

  console.log('Response object: ', responseObj)

  return response.status(200).send(responseObj)
})

export default router
