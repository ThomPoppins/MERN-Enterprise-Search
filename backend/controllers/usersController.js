// TODO: [MERNSTACK-147] Check this userController.js file for errors, this is just copy pasted from Copilot
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      email,
      hashedPassword,
      firstName,
      lastName,
    });

    // Save the user to the database
    await user.save();

    // Return a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser };
