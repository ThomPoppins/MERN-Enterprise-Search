// TODO: [MERNSTACK-150] Remove this file if not needed.

const express = require("express");
const { authenticateToken } = require("./middleware");

const router = express.Router();

/*
 * I'm defining a protected route that requires authentication
 * using the authenticateToken middleware function. If the JWT token is valid, the
 * route handler will return a JSON response with a message indicating that the user is
 * authorized to access the resource. If the JWT token is invalid or not present, the
 * middleware function will return a 401 Unauthorized or 403 Forbidden response, and the
 * route handler will not be called.
 */
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "You are authorized to access this resource." });
});

module.exports = router;
