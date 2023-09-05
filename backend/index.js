import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware to parse the request body as JSON.
app.use(express.json());

// GET method available at "/".
app.get("/", (request, response) => {
  response.status(200).send("Welcome to my Express.js backend server!");
});

// TODO: Create a route to save a new Company document in the database.
// TODO: Create a route to get all Company documents from the database.
// TODO: Create a route to get a single Company document from the database.
// TODO: Create a route to update a single Company document in the database.
// TODO: Create a route to delete a single Company document from the database.

// Route to save a new Book
app.post("/books", async (request, response) => {
  // Create a new book document using the Book model
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message: "Data fields missing, need title, author, and publishYear.",
      });
    }

    // TODO: Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
    // TODO: If the book already exists, send status 409 response and a (error) message to inform the client.

    // Create a new book document using the Book model and the properties from the request body
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Create a new book document using the Book model and the properties from the request body
    const book = await Book.create(newBook);

    // Send status 201 response and the newly created book to the client
    return response.status(201).send(book);
  } catch (error) {
    console.log("Error in POST /books: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all books
app.get("/books", async (request, response) => {
  try {
    // Get all book documents using the Book model's find method
    const books = await Book.find({});

    // Send status 200 response and the books to the client
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log("Error in GET /books: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one book from database using the book's id
app.get("/books/:id", async (request, response) => {
  try {
    // Get the book id from the request parameters
    const { id } = request.params;

    // Get all book documents using the Book model's find method
    const book = await Book.findById(id);

    // Send status 200 response and the books to the client
    return response.status(200).json(book);
  } catch (error) {
    console.log("Error in GET /books: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to update one book in the database using the book's id
app.put("/books/:id", async (request, response) => {
  try {
    // Validate the request body
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message: "Data fields missing, need title, author, and publishYear.",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({
        message: `Cannot find book with id=${id}.`,
      });
    }

    return response.status(200).send({ message: "Book updated successfully." });
  } catch (error) {
    console.log("Error in PUT /books: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete one book from the database using the book's id
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Delete the book document using the Book model's findByIdAndDelete method
    const result = await Book.findByIdAndDelete(id);

    // If no book was found, send status 404 response and a (error) message to inform the client.
    if (!result) {
      return response.status(404).json({
        message: `Cannot find book with id=${id}.`,
      });
    }

    // Send status 200 response and a (success) message to inform the client the book was deleted successfully
    return response.status(200).send({ message: "Book deleted successfully." });
  } catch (error) {
    console.log("Error in DELETE /books: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Connect to MongoDB database
// If connection is successful, start Express.js backend server and listen to PORT
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
