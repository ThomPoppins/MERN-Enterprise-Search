// TODO: [MERNSTACK-195] Define the invite model
import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    // `sender` is a `User` object ID
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // `recipient` is a `User` object ID
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // `event` is a `Event` object ID
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    // `status` is a string with possible values: "pending", "accepted", "declined"
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Invite = mongoose.model("Invite", inviteSchema);
