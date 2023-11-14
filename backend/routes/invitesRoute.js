import express from 'express'
import mongoose from 'mongoose'
import { Invite } from '../models/inviteModel.js'
import { User } from '../models/userModel.js'
import { Company } from '../models/companyModel.js'
import { Image } from '../models/imageModel.js'
import { getStaticFileURLFromPath } from '../middleware/files/staticFiles.js'

const router = express.Router()

// Route to get all pending invites from a specific sender
router.get('/company/sender/pending', async (request, response) => {
  /*
   * Get companyId from request headers
   */
  const companyId = request.headers.companyid,
    // Get senderId from request headers
    senderId = request.headers.senderid

  if (typeof senderId !== 'string') {
    console.log('senderId is not a string.')

    return response.status(400).json({
      message: 'senderId is required.',
    })
  }

  try {
    // Get all invites with status "pending" and senderId equal to senderId
    const invites = await Invite.find({
      senderId: new mongoose.Types.ObjectId(senderId),
      status: 'pending',
    }).sort({ createdAt: -1 })

    // Log the type of invites
    console.log('LET OP!: The type of `invites` is: ', typeof invites)

    // Log the constructor name of invites
    console.log('LET OP!: The invites.constructor.name is: ', {
      class: invites.constructor.name,
    })

    // Convert invites to plain JavaScript objects
    console.log(
      'invites in invitesRoute.js: /invites/company/sender/pending: ',
      invites,
    )

    // Send status 200 response and the invites as JSON response if successful
    return response.status(200).send(invites)
  } catch (error) {
    console.log('ERROR in GET /invites/sender/pending route: ', error)

    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    })
  }
})

// Route to get all invites of a receiver
router.get('/receiver/:userId/pending', async (request, response) => {
  // Get userId from URL
  const { userId } = request.params

  try {
    // Get all invites with status "pending" and receiverId equal to userId
    let invites = await Invite.find({
      receiverId: new mongoose.Types.ObjectId(userId),
      status: 'pending',
    }).sort({ createdAt: -1 })

    /*
     * Convert invites to plain JavaScript objects
     */
    invites = invites.map((invite) => invite.toObject())

    console.log(
      'invites in invitesRoute.js: /invites/receiver/:userId/pending: ',
      invites,
    )

    // Add sender, receiver and company info to invites
    const updatedInvites = await Promise.all(
      invites.map(async (invite) => {
        // Add sender info
        let sender = await User.findById(invite.senderId)

        // Get receiver user data from User model
        let receiver = await User.findById(invite.receiverId)

        // Convert sender to plain JavaScript object
        sender = sender.toObject()

        // Convert receiver to plain JavaScript object
        receiver = receiver.toObject()

        //  Add sender profile picture URL to sender object
        if (sender.profilePicture) {
          // Get sender profile picture
          const senderProfilePictureImageDocument = await Image.findById(
              sender.profilePicture,
            ),
            // Get sender profile picture URL
            senderProfilePictureURL = getStaticFileURLFromPath(
              senderProfilePictureImageDocument.path,
            )

          // Add sender profile picture URL to sender object
          sender.profilePictureURL = senderProfilePictureURL
        }

        //  Add receiver profile picture URL to receiver object
        if (receiver.profilePicture) {
          // Get receiver profile picture
          const receiverProfilePictureImageDocument = await Image.findById(
              receiver.profilePicture,
            ),
            // Get receiver profile picture URL
            receiverProfilePictureURL = getStaticFileURLFromPath(
              receiverProfilePictureImageDocument.path,
            )

          // Add receiver profile picture URL to receiver object
          receiver.profilePictureURL = receiverProfilePictureURL
        }

        let company = null

        // Add company info if invite kind is "company_ownership"
        if (invite.kind === 'company_ownership') {
          if (invite.companyId) {
            // Get company document
            company = await Company.findById(invite.companyId)

            /*
             * Convert company to plain JavaScript object and add it to invite object
             *
             * */
            company = company.toObject()
          }
        }

        // Add sender and receiver to invite object
        return { ...invite, sender, receiver, company }
      }),
    )
      .then((newInvites) => {
        console.log('NEW INVITES:', newInvites)
        return newInvites
      })
      .catch((error) => console.log('error: ', error))

    // Send status 200 response and the invites as JSON response if successful
    return response.status(200).json(updatedInvites)
  } catch (error) {
    console.log('ERROR in GET /receiver/:userId/pending route: ', error)
    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    })
  }
})

// Route for updating an invite status
router.put('/status/:inviteId', async (request, response) => {
  const { inviteId } = request.params

  try {
    // Find the invite document using the inviteId
    const invite = await Invite.findById(inviteId)

    if (!invite) {
      console.log(`Cannot find invite with id=${inviteId}.`)

      return response.status(404).json({
        message: `Cannot find invite with id=${inviteId}.`,
      })
    }

    // Update the invite status
    invite.status = request.body.status

    /*
     * Save the updated invite document
     *
     */
    await invite.save()

    // Send status 200 response and the updated invite document as JSON response if successful
    return response.status(200).json(invite)
  } catch (error) {
    console.log(
      'ERROR in PUT /status/:inviteId route in inviteRoute.js: ',
      error,
    )

    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    })
  }
})

// Route to save a new invite
router.post('/', async (request, response) => {
  // Create a new invite document using the Invite model
  try {
    // Create a new invite document using the Invite model
    const invite = new Invite(request.body)

    // Save the invite document
    await invite.save()

    // Send status 201 response and the new invite document as JSON response if successful
    return response.status(201).json(invite)
  } catch (error) {
    console.log('ERROR in POST /invites route: ', error)
    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    })
  }
})

export default router
