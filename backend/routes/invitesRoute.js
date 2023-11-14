import express from 'express'
import mongoose from 'mongoose'
import { Invite } from '../models/inviteModel.js'
import { User } from '../models/userModel.js'
import { Company } from '../models/companyModel.js'
import { Image } from '../models/imageModel.js'
import { getStaticFileURLFromPath } from '../middleware/files/staticFiles.js'

const router = express.Router()

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
        if (invite.kind === 'company_ownership' && invite.companyId) {
          // Get company document
          company = await Company.findById(invite.companyId)

          /*
           * Convert company to plain JavaScript object and add it to invite object
           *
           * */
          company = company.toObject()
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

// Get all pending invites routes from a company
router.get('/company/pending', async (request, response) => {
  // Get the company id from the request headers
  const companyId = request.headers.companyid

  // Get the invites with status pending, kind company_ownership and companyId equal to companyId
  let invites = await Invite.find({
    status: 'pending',
    kind: 'company_ownership',
    companyId: new mongoose.Types.ObjectId(companyId),
  }).sort({ createdAt: -1 })

  invites = invites.map((invite) => invite.toObject())

  // Add sender, receiver and company info to invites
  const updatedInvites = await Promise.all(
    invites.map(async (invite) => {
      // Add sender info
      let sender = await User.findById(invite.senderId)

      // Add receiver info
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

      // Get company document no if statement needed because the query
      // already filters on companyId, status and kind = "company_ownership"
      const company = await Company.findById(invite.companyId)
        .then((companyDocument) => companyDocument.toObject())
        .catch((error) => console.log('error: ', error))

      // Add sender and receiver to invite object
      return { ...invite, sender, receiver, company }
    }),
  )

  console.log('ALL PENDING COMPANY INVITES: ', updatedInvites)

  // Send status 200 response and the invites as JSON response if successful
  return response.status(200).json(updatedInvites)
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
    let invite = new Invite(request.body)

    // Save the invite document
    await invite.save()

    // Convert invite to plain JavaScript object
    invite = invite.toObject()

    // Add sender, receiver and company info to invite
    // Add sender info
    let sender = await User.findById(invite.senderId)

    // Add receiver info
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
    if (invite.kind === 'company_ownership' && invite.companyId) {
      // Get company document
      company = await Company.findById(invite.companyId)

      /*
       * Convert company to plain JavaScript object and add it to invite object
       *
       * */
      company = company.toObject()
    }

    const updatedInvite = { ...invite, sender, receiver, company }

    // Send status 201 response and the new invite document as JSON response if successful
    return response.status(201).json(updatedInvite)
  } catch (error) {
    console.log('ERROR in POST /invites route: ', error)
    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    })
  }
})

export default router
