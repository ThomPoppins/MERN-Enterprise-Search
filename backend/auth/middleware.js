const jwt = require("jsonwebtoken");

/* I'm defining a middleware function called authenticateToken
 * that takes three parameters: req, res, and next. The req parameter represents the
 * request object, the res parameter represents the response object, and the next
 * parameter represents the next middleware function in the chain.
 *
 * Inside the authenticateToken function, we're checking the Authorization header for
 * a JWT token. If the JWT token is not present, we're returning a 401 Unauthorized
 * response. If the JWT token is present, we're verifying it using the jsonwebtoken
 * library and the process.env.JWT_SECRET environment variable. If the JWT token is
 * invalid, we're returning a 403 Forbidden response. If the JWT token is valid, we're
 * setting the req.user property to the user object contained in the JWT token and
 * calling the next function to pass control to the next middleware function in the chain.
 *
 * After defining the authenticateToken function, we're exporting it as a module so
 * that it can be used in other parts of the application. You can use this middleware
 * function to authenticate requests that require a valid JWT token.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
