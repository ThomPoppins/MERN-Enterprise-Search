import { Image } from "../models/imageModel.js";
import express  from "express";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();


// Multer disk storage configuration.
const storage = multer.diskStorage({
  // `destination` is the folder where the uploaded file will be stored.
   destination: function (request, file, callback) {
    callback(null, "./public/uploads/images");
  },
  //
  // @ts-ignore
  fileFilter: function (request, file, callback) {
    // Accept images only.
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      // Send status 400 response if the file is not an image and a (error) message to inform the client.
      return callback(new Error("Only images allowed!"));
    }

    // Image file is accepted. Pass `true` to the callback.
    callback(null, true);
  },
  // filename is the name of the uploaded file.
  filename: function (request, file, callback) {
    // The file name will be the original name of the uploaded file with a timestamp.
    const fileName = file.originalname.split(".")[0];
    const fileExtension = file.originalname.split(".")[1];
    const timestamp = Date.now();
    // @ts-ignore `callback` is used to pass the file name to multer.
    callback(null, `${fileName}-${timestamp}.${fileExtension}`);
  },
});

// Create multer instance with the storage configuration.
const upload = multer({ storage: storage });

// Use multer middleware to parse multipart/form-data requests.
// router.use(upload.single("image")); //! TODO: REMOVE THIS

// POST image upload route, will be in the uploadRoute.js file if it works.
router.post("/image", upload.single("image"), async (request, response) => {
  // if the file upload was successful, the file will be stored in the "uploads/images" folder.
  console.log("REQUEST FILE: ", request.file);

  if (!request.file) {
    console.log("No image file. `request`: ", request);

    return response.status(400).send({
      message: "No image uploaded.",
    });
  }

  // Prepare response object to send to client with image path and database Image._id.
  const responseObj = {
    message: "Image uploaded successfully!",
    imagePath: request.file.path,
    imageId: new mongoose.Types.ObjectId(),
  };

  // Create Instance of Image model with the image path to safe as docyment in the MongoDB Image collection
  const image = new Image({
    path: request.file.path,
  });

  // Save new Image document to database
  await image
    .save()
    .then((result) => {
      console.log("Image saved to database!");

      console.log("Result saving image call: ", result);

      responseObj["imageId"] = result._id;
    })
    .catch((error) => {
      console.log("Error saving image to database: ", error); //! TODO: Remove console.log and log to error log file

      return response.status(500).send({
        message: "Error saving image to database! " + error.message, //! TODO: REMOVE ERROR MESSAGE
      });
    });

  console.log("Response object: ", responseObj);

  return response.status(200).send(responseObj);
});

// POST method to upload a image to the server.
// The image is stored in the "uploads/images" folder.
router.post("/image", (request, response) => {
  return response.status(200).send({});
});

export default router;
