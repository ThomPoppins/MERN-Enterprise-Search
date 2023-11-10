// @ts-check
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
      !request.body.kvkNumber ||
      !request.body.startYear ||
      !request.body.owners
    ) {
      // Send status 400 response if data fields are missing and a (error) message to inform the client.
      return response.status(400).send({
        message:
          "Data fields missing, need at least a company name, company owner and a start year.",
      });
    }

    const existingCompanyKvk = await Company.findOne({
      kvkNumber: request.body.kvkNumber,
    });
    if (existingCompanyKvk) {
      // Send status 409 response if the company already exists and a (error) message to inform the client.
      return response.status(409).send({
        message: "Company with this KVK number already exists.",
      });
    }

    // Create a new company document using the Company model and the properties from the request body.
    const newCompany = {
      name: request.body.name,
      logo: request.body.logo,
      email: request.body.email,
      phone: request.body.phone,
      kvkNumber: request.body.kvkNumber,
      slogan: request.body.slogan,
      description: request.body.description,
      startYear: request.body.startYear,
      owners: request.body.owners,
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

    // Check if the company kvkNumber is changed and if it changed, check if the new kvkNumber already exists in the database
    const prevCompany = await Company.findById(id).exec();
    if (prevCompany && request.body.kvkNumber !== prevCompany.kvkNumber) {
      const existingCompanyKvk = await Company.findOne({
        kvkNumber: request.body.kvkNumber,
      });
      if (existingCompanyKvk) {
        // Send status 409 response if the company already exists and a (error) message to inform the client.
        return response.status(409).send({
          message: "Company with this KVK number already exists.",
        });
      }
    }

    // Update the company document using the Company model's findByIdAndUpdate method
    const result = await Company.findByIdAndUpdate(id, request.body);

    // If no company was found, send status 404 response and a (error) message to inform the client.
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

// Add owner to company based on userId
router.put("/:companyId/add-owner/:userId", async (request, response) => {
  try {
    const { companyId, userId } = request.params;

    const company = await Company.findById(companyId);

    if (!company) {
      console.log(`Cannot find company with id=${companyId}.`);
      return response.status(404).json({
        message: `Cannot find company with id=${companyId}.`,
      });
    }

    const newOwner = {
      userId: userId,
    };

    if (!company.owners) {
      company.owners = [];
    }

    company.owners.push(newOwner);

    const updatedCompany = await company.save();

    return response.status(200).json(updatedCompany);
  } catch (error) {
    console.log("Error in PUT /companies/add-owner/:userId: ", error);
    response.status(500).send({ message: error.message });
  }
});

// Remove owner from company based on companyId and userId
router.put("/:companyId/remove-owner/:userId", async (request, response) => {
  try {
    const { companyId, userId } = request.params;

    const company = await Company.findById(companyId);

    if (!company) {
      console.log(`Cannot find company with id=${companyId}.`);
      return response.status(404).json({
        message: `Cannot find company with id=${companyId}.`,
      });
    }

    if (!company.owners) {
      console.log(`Cannot find owners in company with id=${companyId}.`);
      return response.status(404).json({
        message: `Cannot find owners in company with id=${companyId}.`,
      });
    }

    // Filter out the owner with the userId to save the company without the owner
    const updatedOwners = company.owners.filter(
      (owner) => owner.userId !== userId
    );

    company.owners = updatedOwners;

    const updatedCompany = await company.save();

    return response.status(200).json(updatedCompany);
  } catch (error) {
    console.log(
      "Error in PUT /companies/:companyId/remove-owner/:userId: ",
      error
    );
    response.status(500).send({ message: error.message });
  }
});

export default router;
