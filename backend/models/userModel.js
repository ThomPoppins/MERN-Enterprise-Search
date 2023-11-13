import mongoose from 'mongoose'

/**
 * Schema for User
 *
 * This Mongoose schema establishes the data structure for the user information within the database.
 * It enforces uniqueness for each user's username and email to prevent double sign-ups and ensuring secure storage of their hashed password.
 * Additional user details are stored in the fields like `firstName`, `lastName`, and `gender`.
 *
 * The `profilePicture` field is an ID reference to the image document in the database image collection, containing the file path local to the CDN (ExpressJS backend) server from
 * which image file is being served. This allows for the image to be retrieved from the CDN (ExpressJS backend server) and displayed on the client-side application
 * page based on a (image_ URL that can logically be generated from the image document's file path. This way no hard coded URLs are needed to be saved in MongoDB database
 * and the image documents will be served independent of the backend server domain address making the image documents portable and reusable in different production and development environments and
 * allowing for easy migration of the image documents to a different storage location hosted on a different domain address.
 *
 *  Additionally, timestamps are automatically recorded for each user document.
 *
 * @typedef {Object} UserSchema
 * @property {string} username - Unique username for the user.
 * @property {string} email - Unique email address for the user.
 * @property {string} hashedPassword - Hashed password for secure authentication.
 * @property {string} firstName - User's first name (default is an empty string).
 * @property {string} lastName - User's last name (default is an empty string).
 * @property {string} gender - User's gender ("Man," "Woman," or "Other").
 * @property {mongoose.Schema.Types.ObjectId} profilePicture - ID reference to the user's profile picture in the database.
 * @property {Date} createdAt - Automatically generated timestamp for document creation.
 * @property {Date} updatedAt - Automatically updated timestamp for document modification.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: '',
    },
    hashedPassword: {
      type: String,
      required: true,
      default: '',
    },
    firstName: {
      type: String,
      required: true,
      default: '',
    },
    lastName: {
      type: String,
      required: true,
      default: '',
    },
    // `gender` can be Man, Woman, or Other
    gender: {
      type: String,
      required: true,
    },
    /*
     * `profilePicture` is a id reference to the image document in the database.
     * The image document contains the path to the image file.
     */
    profilePicture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  },
  { timestamps: true },
)

// Instantiate `User` model
export const User = mongoose.model('User', userSchema)
