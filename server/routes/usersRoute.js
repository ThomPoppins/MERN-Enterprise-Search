import express from 'express'
import { Company } from '../models/companyModel.js'
import { Image } from '../models/imageModel.js'
import { User } from '../models/userModel.js'
import { Invite } from '../models/inviteModel.js'
import { getURLSuffixFromPath } from '../middleware/files/staticFiles.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middleware/auth/jwt.js'
import mongoose from 'mongoose'
import apiLimiter from '../middleware/rate-limiter/apiLimiter.js'

const router = express.Router()

// Route to register a new User
router.post('/', apiLimiter, async (request, response) => {
  // Create a new user document using the User model
  try {
    if (
      !request.body.username ||
      !request.body.email ||
      !request.body.password ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.gender
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message:
          'Data fields missing, need at least a username, email, password, first- & last name and the gender.',
      })
    }

    /// Get user from database based on email
    const existingUserEmail = await User.findOne({
        email: request.body.email,
      }),
      // Get user from the database based on username
      existingUsername = await User.findOne({
        username: request.body.username,
      })
    if (existingUserEmail && existingUsername) {
      // Send status 409 response if the user already exists and a (error) message to inform the client.
      return response.status(409).send({
        message:
          'User with this email and username already exists. Please try again with a different email and username.',
      })
    } else if (existingUserEmail) {
      // Send status 409 response if the user already exists and a (error) message to inform the client.
      return response.status(409).send({
        message: 'User with this email already exists.',
      })
    } else if (existingUsername) {
      // Send status 409 response if the user already exists and a (error) message to inform the client.
      return response.status(409).send({
        message: 'User with this username already exists.',
      })
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10),
      hashedPassword = await bcrypt.hash(request.body.password, salt),
      // Create a new user document using the User model and the properties from the request body.
      newUser = {
        username: request.body.username,
        email: request.body.email,
        hashedPassword,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        gender: request.body.gender,
      },
      // Create a new user document using the User model and the properties from the request body
      user = await User.create(newUser)

    // Send status 201 response and the newly created user to the client
    return response.status(201).send(user)
  } catch (error) {
    console.log('Error in POST /users: ', error)
    return response.status(500).send({
      message:
        'Error registering your account! (Developers, check backend console.log output for error details.)',
    })
  }
})

// Route to add profile picture to user
router.put('/profile-picture', apiLimiter, (request, response) => {
  try {
    // Get the user id from the request body
    const { userId, imageId } = request.body

    // Get the user from the database
    User.findById(userId)
      .then((user) => {
        const imageObjectId = new mongoose.Types.ObjectId(imageId)

        console.log('User: ', user)

        /*
         * Save the updated user to the database
         *
         */
        user
          .updateOne({ profilePicture: imageObjectId })
          .then((result) => {
            console.log('Result saving user call: ', result)

            // Send status 200 response and the updated user to the client
            return response.status(200).send(user)
          })
          .catch((error) => {
            console.log('Error saving user to database: ', error)
            response.status(500).send({
              message: 'Error saving user to database!',
            })
          })
      })
      .catch((error) => {
        console.log('Error finding user in database: ', error)
        response.status(500).send({
          message: 'Error finding user in database!',
        })
      })
  } catch (error) {
    console.log('Error in PUT /users/profilepicture: ', error)
    response.status(500).send({
      message: 'Error updating user profile picture!',
    })
  }
})

// Route to login a user
router.post('/login', apiLimiter, async (request, response) => {
  try {
    if (
      !request.body.email ||
      !request.body.password ||
      request.body.email === '' ||
      request.body.password === ''
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message: 'Data fields missing, need at least a username and password.',
      })
    }

    // Get user from database based on email
    const user = await User.findOne({ email: request.body.email })

    if (!user) {
      // Send status 404 response if user is not found and a (error) message to inform the client.
      return response.status(404).send({
        message: 'User not found, please register an account.',
      })
    }

    const isMatch = await bcrypt.compare(
      request.body.password,
      user.hashedPassword,
    )

    if (!isMatch) {
      // Send status 401 response if password is incorrect and a (error) message to inform the client.
      return response.status(401).send({
        message: 'Password is incorrect.',
      })
    }

    // Generate a new token for the user to save as a cookie in the client browser
    const token = generateToken(user),
      // Add the token to the user object
      responseData = { user, token }

    // Send status 200 response and the user to the client
    return response.status(200).send(responseData)
  } catch (error) {
    console.log('Error in GET /users/login: ', error)
    return response.status(500).send({ message: error.message })
  }
})

// Find user by username, name or email search term
router.get('/search/:searchTerm', apiLimiter, async (request, response) => {
  try {
    const { searchTerm } = request.params

    if (!searchTerm) {
      return response.status(200).json([])
    }

    // Split the search term into search terms by whitespace
    const searchTerms = searchTerm.split(/\s+/u)

    // If searchTerm is empty, return an empty array
    if (!searchTerm) {
      return response.status(200).json([])
    }

    // Get the company id from the request headers
    const companyId = request.headers.companyid,
      // Get the owners of the company
      company = await Company.findById(companyId),
      ownerIds = company.owners.map(
        (owner) => new mongoose.Types.ObjectId(owner.userId),
      ),
      /*
       * Create the aggregation pipeline
       * The results are sorted by relevance
       * The relevance is calculated by the number of matches of the search term in the username, firstName, lastName and email fields
       * The results are limited to 10 of the most relevant users
       */
      pipeline = [
        {
          $match: {
            _id: { $nin: ownerIds },
            $or: searchTerms.map((term) => ({
              $or: [
                { username: { $regex: term, $options: 'i' } },
                { firstName: { $regex: term, $options: 'i' } },
                { lastName: { $regex: term, $options: 'i' } },
                { email: { $regex: term, $options: 'i' } },
              ],
            })),
          },
        },
        {
          $addFields: {
            relevance: {
              $sum: searchTerms.map((term) => ({
                $sum: [
                  {
                    $cond: [
                      { $eq: [{ $toLower: '$username' }, term.toLowerCase()] },
                      1,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      { $eq: [{ $toLower: '$firstName' }, term.toLowerCase()] },
                      1,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      { $eq: [{ $toLower: '$lastName' }, term.toLowerCase()] },
                      1,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      { $eq: [{ $toLower: '$email' }, term.toLowerCase()] },
                      1,
                      0,
                    ],
                  },
                ],
              })),
            },
          },
        },
        { $sort: { relevance: -1 } },
        { $limit: 10 },
      ]
    /*
     * Get the users from the database using the aggregation pipeline
     *
     */

    const users = await User.aggregate(pipeline)

    const updatedUsers = await Promise.all(
      // Loop through the users
      users.map(async (user) => {
        // Do not send the hashed password to the client
        delete user.hashedPassword

        // Get the profile picture document from the database
        const image = await Image.findById(user.profilePicture).catch((error) =>
          console.log('Error in GET /user/:id: ', error),
        )

        // Count how mant invites the user has with status "pending"
        const pendingInvitesCount = await Invite.countDocuments({
          receiverId: user._id,
          status: 'pending',
        })

        // Add the profilePictureURL property to the user object
        const updatedUser = {
          ...user,
          pendingInvitesCount,
        }

        if (image === null) {
          // Return the user
          return updatedUser
        }

        //  Get the path to the profile picture file

        const profilePictureURL = getURLSuffixFromPath(image.path)

        // Add the profilePictureURL property to the user object
        updatedUser.profilePictureURL = profilePictureURL

        // Return the updated user
        return updatedUser
      }),
    )

    // Send status 200 response and the users to the client
    return response.status(200).json(updatedUsers)
  } catch (error) {
    console.log('Error in GET /users/search/:searchTerm: ', error)
    return response.status(500).send({ message: error.message })
  }
})

// Route to get one user from database using the user's id
router.get('/user/:id', apiLimiter, async (request, response) => {
  try {
    // Get the user id from the request parameters
    const { id } = request.params,
      objectId = new mongoose.Types.ObjectId(id)

    let profilePictureURL = ''

    // Get user documents using the findById method
    const userDocument = await User.findById(new mongoose.Types.ObjectId(id)),
      //  Convert the user document to a plain JavaScript object so I can add the profilePictureURL property
      user = userDocument.toObject()

    if (user.profilePicture) {
      // Get the profile picture document from the database
      const image = await Image.findById(user.profilePicture).catch((error) =>
        console.log('Error in GET /user/:id: ', error),
      )
      //  Get the path to the profile picture file
      profilePictureURL = getURLSuffixFromPath(image.path)
    }

    //  Add the profilePictureURL property to the user object
    user.profilePictureURL = profilePictureURL

    // Count how mant invites the user has with status "pending"
    const pendingInvitesCount = await Invite.countDocuments({
      receiverId: objectId,
      status: 'pending',
    })

    //  Add the pendingInvitesCount property to the user object
    user.pendingInvitesCount = pendingInvitesCount

    // bject
    delete user.hashedPassword

    // Send status 200 response and the companies to the client
    return response.status(200).json(user)
  } catch (error) {
    console.log('Error in GET /user/:id: ', error)
    return response.status(500).send({ message: error.message })
  }
})

export default router
