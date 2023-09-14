import express from "express";
import { Company } from "../models/companyModel.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// TODO: [MERNSTACK-112] Remove this function once the payment model has been fully implemented.
// Generate a random payment id using the uuidv4 function.
const generateRandomId = () => {
  let paymentId = uuidv4();
  return paymentId;
};

// Route to save a new Company
router.post("/", async (request, response) => {
  // Create a new company document using the Company model
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.phone ||
      !request.body.startYear ||
      !request.body.owners
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message:
          "Data fields missing, need at least a company name, company owner and a start year.",
      });
    }

    // TODO: [MERNSTACK-110] Check if the company already exists in the database. Hint: Use the findOne method and consider using `unique: true` in the company schema.
    // TODO: [MERNSTACK-111] If the company already exists, send status 409 response and a (error) message to inform the client.

    // Create a new company document using the Company model and the properties from the request body.
    // TODO: [MERNSTACK-109] Populate the company document with the properties from the request body if they exist.
    // TODO: [MERNSTACK-] Decide if the default values should be set in the model or in the route. Hint: Consider using the `default` property in the company schema.
    const newCompany = {
      name: request.body.name,
      email: request.body.email ? request.body.email : "",
      phone: request.body.phone ? request.body.phone : "",
      owners: request.body.owners ? request.body.owners : [],
      startYear: request.body.startYear ? request.body.startYear : 0,
      payments: request.body.payments
        ? request.body.payments
        : [
            {
              id: generateRandomId(),
            },
          ],
    };

    // Create a new company document using the Company model and the properties from the request body
    const company = await Company.create(newCompany);

    // Send status 201 response and the newly created company to the client
    return response.status(201).send(company);
  } catch (error) {
    console.log("Error in POST /companies: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all companies
router.get("/", async (request, response) => {
  try {
    // Get all company documents using the Company model's find method
    const companies = await Company.find({});

    // Send status 200 response and the companies to the client
    return response.status(200).json({
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    console.log("Error in GET /companies: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all companies from certain owner
router.get("/owned-companies/:ownerUserId", async (request, response) => {
  try {
    // Get the  owners' userId from the request parameters
    const { ownerUserId } = request.params;
    // Get all company documents frm
    const companies = await Company.find({
      owners: { $elemMatch: { userId: ownerUserId } },
    });

    // Send status 200 response and the companies to the client
    return response.status(200).json({
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    console.log("Error in GET /owned-companies/:ownerUserId ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one company from database using the company's id
router.get("/:id", async (request, response) => {
  try {
    // Get the company id from the request parameters
    const { id } = request.params;

    // Get all company documents using the Company model's find method
    const company = await Company.findById(id);

    // Send status 200 response and the companies to the client
    return response.status(200).json(company);
  } catch (error) {
    console.log("Error in GET /companies: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to update one company in the database using the company's id
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Company.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({
        message: `Cannot find company with id=${id}.`,
      });
    }

    return response
      .status(200)
      .send({ message: "Company updated successfully." });
  } catch (error) {
    console.log("Error in PUT /companies: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete one company from the database using the company's id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Delete the company document using the Company model's findByIdAndDelete method
    const result = await Company.findByIdAndDelete(id);

    // If no company was found, send status 404 response and a (error) message to inform the client.
    if (!result) {
      return response.status(404).json({
        message: `Cannot find company with id=${id}.`,
      });
    }

    // Send status 200 response and a (success) message to inform the client the company was deleted successfully
    return response
      .status(200)
      .send({ message: "Company deleted successfully." });
  } catch (error) {
    console.log("Error in DELETE /companies: ", error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
