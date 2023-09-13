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

// TODO: [MERNSTACK-161] Fix CORS policy error when registering user
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
    // TODO: [MERNSTACK-155] Populate the user document with the properties from the request body if they exist.
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

export default router;
