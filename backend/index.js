import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { PORT, mongoDBURL } from './config.js'
import authRoute from './routes/authRoute.js'
import booksRoute from './routes/booksRoute.js'
import companiesRoute from './routes/companiesRoute.js'
import invitesRoute from './routes/invitesRoute.js'
import kvkRoute from './routes/kvkRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import usersRoute from './routes/usersRoute.js'

const app = express()

/*
 * // TODO: [MERNSTACK-113] Configure CORS properly and securely before deployment.
 * Example CORS configuration:
 * app.use(cors({
 *   origin: "http://localhost:3000",
 *   methods: ["GET", "POST", "PUT", "DELETE"],
 *   allowedHeaders: ["Content-Type"]
 * }));
 * How to set up credentials with CORS: https://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i
 * Middleware to allow cross-origin requests.
 */
app.use(cors())

// Middleware to parse the request body as JSON.
app.use(express.json())

// Use .static() and configure the /public folder for hosting static resources as CDN for images and other files.
app.use(express.static('public'))

// GET method available at "/".
app.get('/', (request, response) => {
  response
    // eslint-disable-next-line no-magic-numbers
    .status(200)
    .send(
      "<div style='padding: 30px; width: 100vw; height: 100vh; background-color: black; position:fixed; top: 0; left: 0;'>" +
        "<h1 style='color: white;'>Welcome to my MERN stack backend server with Express.js!</h1>" +
        '</div>'
    )
})

// Use routers from /routes folder
app.use('/books', booksRoute)
app.use('/companies', companiesRoute)
app.use('/users', usersRoute)
app.use('/invites', invitesRoute)
app.use('/auth', authRoute)
app.use('/kvk', kvkRoute)
app.use('/upload', uploadRoute)

/*
 * Connect to MongoDB database
 * If connection is successful, start Express.js backend server and listen to PORT
 */
mongoose
  .connect(mongoDBURL)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('App connected successfully to the database!')

    // Start Express.js server and listen to port 5555
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App is listening to port ${PORT}`)
    })
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Mongoose connect error in index.js: ', error)
  })
