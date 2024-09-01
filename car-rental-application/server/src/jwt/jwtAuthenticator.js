const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Get the token from the HTTP-only cookie
  const token = req.cookies.accessToken;
  console.log(`token : ${token}`);
  if (!token) return res.sendStatus(401); // Unauthorized if no token is found

  // Verify the token with process.env.JWT_SECRET
  jwt.verify(token, "SECRETKEY", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    // Attach user info to request
    req.user = user;
    next();
  });
}

module.exports = {authenticateToken};
