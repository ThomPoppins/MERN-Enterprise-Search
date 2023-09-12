import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const { _id, name, email } = user;
  return jwt.sign(
    {
      _id,
      username,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.log("JWT verification error: ", error.message);
    return null;
  }
};

export { generateToken, verifyToken };
