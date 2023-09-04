import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// GET method available at "/"
app.get("/", (request, response) => {
  response.status(200).send("Welcome to my Express.js backend server!");
});

// TODO: Create a route to save a new company document in the database.
app.post("/companies", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.addresses ||
      !request.body.city ||
      !request.body.country ||
      !request.body.email ||
      !request.body.phone ||
      !request.body.owner
    ) {
      console.log("name, address, city, country, email, phone, and owner.");
    }

// Route to save a new Book
app.post("/books", async (request, response) => {
  // Create a new book document using the Book model
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      // TODO: Check what you rather have here, throw an error OR send status 400 response.
      // throw new Error(
      //   "Data fields missing, need title, author, and publishYear."
      // );

      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message: "Data fields missing, need title, author, and publishYear.",
      });
    }

    // TODO: Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
    // TODO: If the book already exists, send status 409 response and a (error) message to inform the client.

    // Create a new book document using the Book model and the properties from the request body
    const newBook = await Book.create({
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    });
  } catch (error) {
    console.log("Error in POST /books: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Connect to MongoDB database
// If connection is successful, start Express.js backend server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected successfully to the database!");

    // Start Express.js server and listen to port 5555
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongoose connect error in index.js: ", error);
  });
