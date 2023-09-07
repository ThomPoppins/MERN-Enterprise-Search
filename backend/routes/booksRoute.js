import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to save a new Book
router.post("/", async (request, response) => {
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
    const newCompany = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Create a new book document using the Book model and the properties from the request body
    const book = await Book.create(newCompany);

    // Send status 201 response and the newly created book to the client
    return response.status(201).send(book);
  } catch (error) {
    console.log("Error in POST /books: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all books
router.get("/", async (request, response) => {
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
router.get("/:id", async (request, response) => {
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
router.put("/:id", async (request, response) => {
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
router.delete("/:id", async (request, response) => {
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

export default router;
