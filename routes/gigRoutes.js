const express = require('express'),
      { cloudinary, upload } = require("../models/cloudinary"),
      gigController = require('../controllers/gigController'),
      authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router
  .route('/')
  .get(gigController.getAllGigs)
  .post(authenticationController.isLoggedIn, upload.single('image'),gigController.createGig);

router
  .route('/new')
  .get(authenticationController.isLoggedIn, gigController.gigForm);

router
  .route('/:id')
  .get(gigController.getGig)
  .put(authenticationController.checkGigOwnership, upload.single('image'),gigController.updateGig)
  .delete(authenticationController.checkGigOwnership, gigController.deleteGig);

router
.route('/:id/edit')
.get(authenticationController.checkGigOwnership, gigController.editGigForm);

module.exports = router