const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingControllers");
const { authenticateToken } = require("../jwt/jwtAuthenticator");

// import booking controller
// const BookingModel = require('../models/Booking.js')

router.post("/bookcar", authenticateToken, BookingController.bookAndUpdateCar);

module.exports = router;
