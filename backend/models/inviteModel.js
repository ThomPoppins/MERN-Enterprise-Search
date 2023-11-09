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
    // `kind` is a string with possible values: "company_ownership", "friend", "other"
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
    //! ONLY 4 STATUSES: "pending", "accepted", "declined" and "canceled"
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Invite = mongoose.model("Invite", inviteSchema);
