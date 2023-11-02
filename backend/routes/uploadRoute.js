import express from "express";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

// Middleware to parse the request body as JSON. Size is increased to 500 MB*/
router.use(bodyParser.json({ limit: "500mb" }));
// Middleware to parse the request body as URL encoded data.
router.use(bodyParser.urlencoded([{ extended: false, limit: "500mb" }]));

// POST method to upload a image to the server.
// The image is stored in the "uploads/images" folder.
router.post("/image", (request, response) => {
  return response.status(200).send({});
});

export default router;
