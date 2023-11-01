import { JWT_SECRET } from "../../config.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const { _id, username, email, hashedPassword } = user;
  return jwt.sign(
    {
      _id,
      username,
      email,
      hashedPassword,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const verifyToken = (token) => {
  try {
    // console.log("JWT verification token in /middleware/auth/jwt.js: ", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("JWT verification successful: ", decoded);
    return decoded._id;
  } catch (error) {
    console.log("JWT verification error: ", error.message);
    return null;
  }
};

export { generateToken, verifyToken };
