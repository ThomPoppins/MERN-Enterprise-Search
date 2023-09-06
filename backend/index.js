import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware to parse the request body as JSON.
app.use(express.json());

// GET method available at "/".
app.get("/", (request, response) => {
  response
    .status(200)
    .send(
      "<div style='padding: 30px; width: 100vw; height: 100vh; background-color: black; position:fixed; top: 0; left: 0;'>" +
        "<h1 style='color: white;'>Welcome to my MERN stack backend server with Express.js!</h1>" +
        "</div>"
    );
});

// Use routers from /routes folder
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
