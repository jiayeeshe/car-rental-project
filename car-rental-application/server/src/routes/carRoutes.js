const express = require('express');
const router = express.Router();
const carController = require('../controllers/carControllers');

router.get("/getallcars", carController.getAllCars);

module.exports= router;