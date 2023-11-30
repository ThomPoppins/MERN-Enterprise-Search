import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import companiesRoute from './routes/companiesRoute.js'
import findRoute from './routes/findRoute.js'
import invitesRoute from './routes/invitesRoute.js'
import kvkRoute from './routes/kvkRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import usersRoute from './routes/usersRoute.js'
import filesRoute from './routes/filesRoute.js'

const { PORT, MONGODB_URL } = process.env

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
      // eslint-disable-next-line quotes
      "<div style='padding: 30px; width: 100vw; height: 100vh; background-color: black; position:fixed; top: 0; left: 0;'><h1 style='color: white;'>Welcome to my MERN stack backend server with Express.js!</h1></div>",
    )
})

// Use routers from /routes folder
app.use('/companies', companiesRoute)
app.use('/users', usersRoute)
app.use('/invites', invitesRoute)
app.use('/find', findRoute)
app.use('/files', filesRoute)
app.use('/auth', authRoute)
app.use('/kvk', kvkRoute)
app.use('/upload', uploadRoute)

console.log('MONGODB_URL:', process.env.MONGODB_URL)

/*
 * Connect to MongoDB database
 * If connection is successful, start Express.js backend server and listen to PORT
 */
mongoose
  .connect(MONGODB_URL)
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
