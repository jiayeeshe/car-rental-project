const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const { authenticateToken } = require('../jwt/jwtAuthenticator');

router.post("/register", adminController.register);
router.post("/login", adminController.login)
router.put("/updateCarDetails/:carId", authenticateToken, adminController.updateCarDetails)
router.post("/insertNewCar", authenticateToken, adminController.insertNewCar);
router.post("/deleteExistingCar/:carId", authenticateToken, adminController.deleteExistingCar);


module.exports= router;
