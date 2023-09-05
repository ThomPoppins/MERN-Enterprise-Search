import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware to parse the request body as JSON.
app.use(express.json());

// GET method available at "/".
app.get("/", (request, response) => {
  response.status(200).send("Welcome to my Express.js backend server!");
});

app.use("/books", booksRoute);

// Connect to MongoDB database
// If connection is successful, start Express.js backend server and listen to PORT
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected successfully to the database!");

    // Start Express.js server and listen to port 5555
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongoose connect error in index.js: ", error);
  });

//hello
