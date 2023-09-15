import express from "express";
import { Company } from "../models/companyModel.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth/jwt.js";

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

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    // TODO: [MERNSTACK-153] Check if the user already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the user schema.

    // TODO: [MERNSTACK-154] If the user already exists, send status 409 response and a (error) message to inform the client.

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
    response.status(500).send({ message: error.message });
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

// TODO: TEST THIS ROUTE!
// Find user by username, name or email search term
router.get("/search/:searchTerm", async (request, response) => {
  try {
    const { searchTerm } = request.params;

    console.log("searchTerm: ", searchTerm);

    // If searchTerm is empty, return an empty array
    if (!searchTerm) {
      return response.status(200).json([]);
    }

    // Get the company id from the request headers
    const companyId = request.headers.companyid;

    // Get the owners of the company
    const company = await Company.findById(companyId);
    const ownerIds = company.owners.map((owner) => owner.userId);

    // Get user documents using the find method
    const users = await User.find({
      $and: [
        {
          _id: {
            $nin: ownerIds,
          },
        },
        {
          $or: [
            { username: { $regex: searchTerm, $options: "i" } },
            { firstName: { $regex: searchTerm, $options: "i" } },
            { lastName: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
          ],
        },
      ],
    });

    // Send status 200 response and the companies to the client
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
