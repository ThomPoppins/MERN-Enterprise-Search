import express from "express";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

// TODO: [MERNSTACK-202] Fix backend error "PayloadTooLargeError: request entity too large" wanneer de afbeeldingdata te groot is voor ExpressJS https://www.webslesson.info/2022/05/upload-file-in-node-js-express-using-multer.html
// Use multer to configure the request size: https://www.webslesson.info/2022/05/upload-file-in-node-js-express-using-multer.html
const upload = multer({
  limits: { fileSize: 500 * 1024 * 1024 }, // Max file size: 500 MB
});

// Route to upload a file
router.post("/", function (request, response, next) {
  // Multer middleware to upload file and store it locally in a folder (called "/upload")
  var storage = multer.diskStorage({
    // Set file destination folder to /upload
    destination: function (request, file, callback) {
      callback(null, "./upload");
    },
    // Set file name to original file name + timestamp
    filename: function (request, file, callback) {
      // Split file name and extension
      var temp_file_arr = file.originalname.split(".");
      // Get file name
      var temp_file_name = temp_file_arr[0];
      // Get file extension
      var temp_file_extension = temp_file_arr[1];

      // Set file name to original file name + timestamp
      callback(
        null,
        temp_file_name + "-" + Date.now() + "." + temp_file_extension
      );
    },
  });

  // Multer middleware to upload file and store it locally in a folder (called "/upload")
  var upload = multer({ storage: storage }).single("sample_image");

  // Upload file
  upload(request, response, function (error) {
    if (error) {
      return response.end("Error Uploading File");
    } else {
      return response.end("File is uploaded successfully");
    }
  });
});

export default router;
