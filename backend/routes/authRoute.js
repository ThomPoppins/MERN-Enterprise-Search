// @ts-check

import express from "express";
import { verifyToken } from "../middleware/auth/jwt.js";

const router = express.Router();

router.get("/verify-token", async (request, response) => {
  const { token } = request.query;
  const userId = verifyToken(token);
  // console.log("userId in authRoute.js: ", userId);
  if (userId) {
    return response.status(200).json({ userId });
  }
  return response.status(401).json({ message: "Invalid token" });
});

export default router;
