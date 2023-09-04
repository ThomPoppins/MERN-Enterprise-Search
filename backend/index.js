import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (request, response) => {
  response.status(200).send("Welcome to my Express.js backend server!");
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
