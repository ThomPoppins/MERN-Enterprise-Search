import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

// Use multer to parse multipart/form-data requests.
// The image is stored in the "uploads/images" folder.
const storage = multer.diskStorage({
  // Destination is the folder where the uploaded file will be stored.
  destination: function (request, file, callback) {
    callback(null, "./uploads/images");
  },
  fileFilter: function (request, file, callback) {
    // Accept images only.
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error("Only images allowed!"));
    }
    callback(null, true);
  },
  // filename is the name of the uploaded file.
  filename: function (request, file, callback) {
    // The file name will be the original name of the uploaded file with a timestamp.
    const fileName = file.originalname.split(".")[0];
    const fileExtension = file.originalname.split(".")[1];
    const timestamp = Date.now();
    callback(null, `${fileName}-${timestamp}.${fileExtension}`);
  },
});

// Create multer instance with the storage configuration.
const upload = multer({ storage: storage });
// Use multer middleware to parse multipart/form-data requests.
// router.use(upload.single("image"));

// POST image upload route, will be in the uploadRoute.js file if it works.
router.post("/image", upload.single("image"), (request, response) => {
  // if the file upload was successful, the file will be stored in the "uploads/images" folder.
  console.log("REQUEST FILE: ", request.file);

  return response.status(200).send(request.file.path);
});

// POST method to upload a image to the server.
// The image is stored in the "uploads/images" folder.
router.post("/image", (request, response) => {
  return response.status(200).send({});
});

export default router;
