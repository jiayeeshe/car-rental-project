const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (user) => {
    // Payload can include the user ID or other relevant information
    const payload = {
        id: user._id,
        role: user.role,
        // role: user.role, // Optional: if you want to include user role
    };

    // Sign the JWT token with a secret key and set expiration time //process.env.JWT_SECRET
    const accesstoken = jwt.sign(payload, "SECRETKEY", {
        expiresIn: '1h', // Token expires in 1 hour
    });
    return accesstoken; // Return the signed token
};

module.exports = {generateToken}