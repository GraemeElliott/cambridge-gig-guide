const express = require('express');
const venueController = require('../controllers/venueController');

const router = express.Router();

router
  .route('/')
  .get(venueController.getAllVenues);

module.exports = router;