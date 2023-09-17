import express from "express";
import { Company } from "../models/companyModel.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth/jwt.js";
import mongoose from "mongoose";

const router = express.Router();

// Generate random id
// TODO: Remove function if not needed anymore.
const generateRandomId = () => {
  return uuidv4();
};

// Route to register a new User
router.post("/", async (request, response) => {
  // Create a new user document using the User model
  try {
    if (
      !request.body.username ||
      !request.body.email ||
      !request.body.password
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message:
          "Data fields missing, need at least a username, email and password.",
      });
    }

    /// Get user from database based on email
    const existingUserEmail = await User.findOne({
      email: request.body.email,
    });
    // Get user from the database based on username
    const existingUsername = await User.findOne({
      username: request.body.username,
    });
    if (existingUserEmail && existingUsername) {
      // Send status 409 response if the user already exists and a (error) message to inform the client.
      return response.status(409).send({
        message:
          "User with this email and username already exists. Please try again with a different email and username.",
      });
    } else if (existingUserEmail) {
      // Send status 409 response if the user already exists and a (error) message to inform the client.
      return response.status(409).send({
        message: "User with this email already exists.",
      });
    } else if (existingUsername) {
      // Send status 409 response if the user already exists and a (error) message to inform the client.
      return response.status(409).send({
        message: "User with this username already exists.",
      });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    // Create a new user document using the User model and the properties from the request body.
    const newUser = {
      username: request.body.username,
      email: request.body.email,
      hashedPassword: hashedPassword,
      firstName: request.body.firstName ? request.body.firstName : "",
      lastName: request.body.lastName ? request.body.lastName : "",
    };

    // Create a new user document using the User model and the properties from the request body
    const user = await User.create(newUser);

    // Send status 201 response and the newly created user to the client
    return response.status(201).send(user);
  } catch (error) {
    console.log("Error in POST /users: ", error);
    response.status(500).send({
      message:
        "Error registering your account! (Developers, check backend console.log output for error details.)",
    });
  }
});

// Route to login a user
router.post("/login", async (request, response) => {
  try {
    if (
      !request.body.email ||
      !request.body.password ||
      request.body.email === "" ||
      request.body.password === ""
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message: "Data fields missing, need at least a username and password.",
      });
    }

    // Get user from database based on email
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      // Send status 404 response if user is not found and a (error) message to inform the client.
      return response.status(404).send({
        message: "User not found, please register an account.",
      });
    }

    const isMatch = await bcrypt.compare(
      request.body.password,
      user.hashedPassword
    );

    if (!isMatch) {
      // Send status 401 response if password is incorrect and a (error) message to inform the client.
      return response.status(401).send({
        message: "Password is incorrect.",
      });
    }

    // Generate a new token for the user to save as a cookie in the client browser
    const token = generateToken(user);

    // Add the token to the user object
    const responseData = { user, token };

    // Send status 200 response and the user to the client
    return response.status(200).send(responseData);
  } catch (error) {
    console.log("Error in GET /users/login: ", error);
    response.status(500).send({ message: error.message });
  }
});

router.get("/search", async (request, response) => {
  return response.status(200).json([]);
});

// Find user by username, name or email search term
router.get("/search/:searchTerm", async (request, response) => {
  try {
    const { searchTerm } = request.params;

    // Split the search term into search terms by whitespace
    const searchTerms = searchTerm.split(/\s+/);

    // If searchTerm is empty, return an empty array
    if (!searchTerm) {
      return response.status(200).json([]);
    }

    // Get the company id from the request headers
    const companyId = request.headers.companyid;

    // Get the owners of the company
    const company = await Company.findById(companyId);
    const ownerIds = company.owners.map(
      (owner) => new mongoose.Types.ObjectId(owner.userId)
    );

    // Create the aggregation pipeline
    // The results are sorted by relevance
    // The relevance is calculated by the number of matches of the search term in the username, firstName, lastName and email fields
    // The results are limited to 10 of the most relevant users
    const pipeline = [
      {
        $match: {
          _id: { $nin: ownerIds },
          $or: searchTerms.map((term) => ({
            $or: [
              { username: { $regex: term, $options: "i" } },
              { firstName: { $regex: term, $options: "i" } },
              { lastName: { $regex: term, $options: "i" } },
              { email: { $regex: term, $options: "i" } },
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
                    { $eq: [{ $toLower: "$username" }, term.toLowerCase()] },
                    1,
                    0,
                  ],
                },
                {
                  $cond: [
                    { $eq: [{ $toLower: "$firstName" }, term.toLowerCase()] },
                    1,
                    0,
                  ],
                },
                {
                  $cond: [
                    { $eq: [{ $toLower: "$lastName" }, term.toLowerCase()] },
                    1,
                    0,
                  ],
                },
                {
                  $cond: [
                    { $eq: [{ $toLower: "$email" }, term.toLowerCase()] },
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
    ];

    // Get the users from the database using the aggregation pipeline
    const users = await User.aggregate(pipeline);

    // Send status 200 response and the users to the client
    return response.status(200).json(users);
  } catch (error) {
    console.log("Error in GET /users/search/:searchTerm: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one user from database using the user's id
router.get("/user/:id", async (request, response) => {
  try {
    // Get the user id from the request parameters
    const { id } = request.params;

    // Get user documents using the findById method
    const user = await User.findById(id);

    // Send status 200 response and the companies to the client
    return response.status(200).json(user);
  } catch (error) {
    console.log("Error in GET /user/:id: ", error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
