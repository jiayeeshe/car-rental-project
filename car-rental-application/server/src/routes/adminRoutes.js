const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

router.post("/register", adminController.register);
router.post("/login", adminController.login)
router.put("/updateCarDetails/:carId", adminController.updateCarDetails)

module.exports= router;
