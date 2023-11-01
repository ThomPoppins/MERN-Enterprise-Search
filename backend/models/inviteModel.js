import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    // `sender` is a `User` object ID
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // `recipient` is a `User` object ID
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // `kind` is a string with possible values: "ownership", "friend", "other"
    kind: {
      type: String,
      required: true,
      default: "other",
    },
    // `company` is a `Company` object ID
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
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

const inviteModel = mongoose.model("Invite", inviteSchema);

export default inviteModel;
