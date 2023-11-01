import express from "express";
import mongoose from "mongoose";
import inviteModel from "../models/inviteModel.js";

const router = express.Router();

// Route to save a new invite
router.post("/", async (request, response) => {
  // Create a new invite document using the Invite model
  try {
    const newInvite = new inviteModel({
      sender: request.body.sender,
      recipient: request.body.recipient,
      event: request.body.event,
      status: request.body.status,
    });

    // Save the new invite document
    await newInvite.save();

    // Send status 201 response and the new invite document as JSON response if successful
    return response.status(201).json(newInvite);
  } catch (error) {
    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    });
  }
});
