import express from "express";
import { Company } from "../models/companyModel.js";

const router = express.Router();

// Route to save a new Company
router.post("/", async (request, response) => {
  // Create a new book document using the Book model
  try {
    if (!request.body.name) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message: "Data fields missing, need at least a company name.",
      });
    }

    // TODO: Check if the book already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the book schema.
    // TODO: If the book already exists, send status 409 response and a (error) message to inform the client.

    // Create a new book document using the Book model and the properties from the request body
    // TODO: Add all properties assigned in the schema and request body, check their value to be true
    const newCompany = {
      name: request.body.name,
      email: request.body.email ? request.body.email : "",
      phone: request.body.phone ? request.body.phone : "",
      slogan: request.body.slogan ? request.body.slogan : "",
      description: request.body.description ? request.body.description : "",
      country: request.body.country ? request.body.country : "",
      region: request.body.region ? request.body.region : "",
      owners: request.body.owners ? request.body.owners : [],
      companyAdmins: request.body.companyAdmins
        ? request.body.companyAdmins
        : [],
      locations: request.body.locations ? request.body.locations : [],
      departments: request.body.departments ? request.body.departments : [],
      businessConfig: request.body.businessConfig
        ? request.body.businessConfig
        : {},
      paymentDetails: request.body.paymentDetails
        ? request.body.paymentDetails
        : {
            // TODO: `id` corresponding to the `paymentMethod` model document `id`
            paymentMethodId: 0,
            vatNumber: "",
            iban: "",
            creditCard: {
              number: "",
              securityCode: "",
            },
            bic: "",
            kvkNumber: "",
            taxNumber: "",
            taxOffice: "Belastingdienst",
            taxOfficeAddress: "Parnassusweg 5",
            taxOfficePostalCode: "1077 DC",
            taxOfficeCity: "Amsterdam",
            taxOfficeCountry: "NL",
            taxOfficePhone: "",
            taxOfficeEmail: "",
          },
      startYear: request.body.startYear ? request.body.startYear : 0,
      endYear: request.body.endYear ? request.body.endYear : 0,
      active: request.body.active ? request.body.active : true,
      industry: request.body.industry ? request.body.industry : "",
      public: request.body.public ? request.body.public : true,
      reviews: request.body.reviews ? request.body.reviews : [],
      rating: 0,
      customers: request.body.customers ? request.body.customers : [],
      premium: request.body.premium ? request.body.premium : "none",
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
