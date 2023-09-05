import mongoose from "mongoose";

// Create a new book schema for our database.
// The schema defines the shape of documents in a collection.
// In this case, a book will have a name property of type String.
// The name property is required, which means that every book document must have a name.
// Same goes for the author and publishYear properties, only the publishYear property is of type Number.
// timestamps: true adds createdAt and updatedAt properties to the book document.
// createdAt is the date and time when the book document was created.
// updatedAt is the date and time when the book document was last updated.
// These properties are useful for debugging purposes.
// For example, if a book document was created a long time ago and it has not been updated since,
// then it is probably safe to delete it.
// If a book document was created a long time ago and it has been updated recently,
// then it is probably still in use and should not be deleted.
// The timestamps option is not required, but it is useful.

// TODO: Delete this schema once it is no longer needed. MERN-6

/**
 * @typedef {Object} Book
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {number} publishYear - The year the book was published.
 * @property {Date} createdAt - The date and time when the book document was created.
 * @property {Date} updatedAt - The date and time when the book document was last updated.
 */
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  // enable timestamps
  { timestamps: true }
);

// Create a new model using the bookSchema.
// A model is a class with which we construct documents.
// In this case, a book will be a document in our MongoDB database.
export const Book = mongoose.model("Book", bookSchema);
