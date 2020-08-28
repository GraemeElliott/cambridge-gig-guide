const express = require('express'),
      { cloudinary, upload } = require("../models/cloudinary"),
      venueController = require('../controllers/venueController'),
      authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router
  .route('/')
  .get(venueController.getAllVenues)
  .post(authenticationController.isLoggedIn, upload.single('image'),venueController.createVenue);

router
  .route('/new')
  .get(authenticationController.isLoggedIn, venueController.venueForm);

router
  .route('/:id')
  .get(venueController.getVenue)
  .put(authenticationController.checkVenueOwnership, venueController.updateVenue)
  .delete(authenticationController.checkVenueOwnership, venueController.deleteVenue);

router
  .route('/:id/edit')
  .get(authenticationController.checkVenueOwnership, venueController.editVenueForm);

module.exports = router