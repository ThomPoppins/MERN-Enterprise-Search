import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET } = process.env

const generateToken = (user) => {
    const { _id, username, email, hashedPassword } = user
    return jwt.sign(
      {
        _id,
        username,
        email,
        hashedPassword,
      },
      JWT_SECRET,
      {
        expiresIn: '30d',
      },
    )
  },
  verifyToken = (token) => {
    try {
      // Console.log("JWT verification token in /middleware/auth/jwt.js: ", token);
      const decoded = jwt.verify(token, JWT_SECRET)
      // Console.log("JWT verification successful: ", decoded);
      return decoded._id
    } catch (error) {
      console.log('JWT verification error: ', error.message)
      return null
    }
  }

export { generateToken, verifyToken }
