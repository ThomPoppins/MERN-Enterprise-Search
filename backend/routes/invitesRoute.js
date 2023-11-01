import express from "express";
import mongoose from "mongoose";
import inviteModel from "../models/inviteModel.js";

const router = express.Router();

// Route to get all invites from a specific user
router.get("/:userId", async (request, response) => {
  // Find all invites from a specific user
  try {
    const invites = await inviteModel.find({
      $or: [
        { sender: request.params.userId },
        { recipient: request.params.userId },
      ],
    });

    // Send status 200 response and the invites as JSON response if successful
    return response.status(200).json(invites);
  } catch (error) {
    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    });
  }
});

// Route to save a new invite
router.post("/", async (request, response) => {
  // Create a new invite document using the Invite model
  try {
    const newInvite = new inviteModel({
      sender: mongoose.Types.ObjectId(request.body.senderId),
      recipient: mongoose.Types.ObjectId(request.body.recipientId),
      kind: request.body.kind,
      company: request.body.companyId
        ? mongoose.Types.ObjectId(request.body.companyId)
        : null,
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
