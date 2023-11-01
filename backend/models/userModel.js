import mongoose from "mongoose";

/**
 * Mongoose Schema for User
 *
 * This schema defines the structure for storing user information in the database.
 * Each user has a unique username and email, along with their hashed password for security.
 * Optional first and last names are provided with default values.
 * Additionally, timestamps are automatically recorded for each user document.
 *
 * @typedef {Object} UserSchema
 * @property {string} username - Unique username for the user.
 * @property {string} email - Unique email address for the user.
 * @property {string} hashedPassword - Hashed password for secure authentication.
 * @property {string} firstName - User's first name (default is an empty string).
 * @property {string} lastName - User's last name (default is an empty string).
 * @property {Date} createdAt - Automatically generated timestamp for document creation.
 * @property {Date} updatedAt - Automatically updated timestamp for document modification.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    hashedPassword: {
      type: String,
      required: true,
      default: "",
    },
    firstName: {
      type: String,
      required: true,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      default: "",
    },
    // `profilePicture` is a Base64 encoded string
    profilePicture: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
