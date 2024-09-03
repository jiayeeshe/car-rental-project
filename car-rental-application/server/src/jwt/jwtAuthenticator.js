const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET

function authenticateToken(req, res, next) {
  // Get the token from the HTTP-only cookie
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401); // Unauthorized if no token is found

  // Verify the token with process.env.JWT_SECRET
  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    console.log("admin is verificated");
    // Attach user info to request
    req.user = user;
    next();
  });
}

module.exports = {authenticateToken};
