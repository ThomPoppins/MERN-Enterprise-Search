import express from "express";
import mongoose from "mongoose";
import inviteModel from "../models/inviteModel.js";

const router = express.Router();

// Route to get all invites from a specific recipient user
router.get("/recipient/:userId", async (request, response) => {
  const { userId } = request.params;

  try {
    const invites = await inviteModel.find({
      recipient: mongoose.Types.ObjectId(userId),
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
      senderId: new mongoose.Types.ObjectId(request.body.senderId),
      recipientId: new mongoose.Types.ObjectId(request.body.recipientId),
      kind: request.body.kind,
      companyId: request.body.companyId
        ? new mongoose.Types.ObjectId(request.body.companyId)
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

export default router;
