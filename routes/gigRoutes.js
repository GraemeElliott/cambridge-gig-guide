const express = require('express');
const gigController = require('../controllers/gigController');
const authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router
  .route('/')
  .get(gigController.getAllGigs)
  .post(authenticationController.isLoggedIn, gigController.createGig);

router
  .route('/new')
  .get(authenticationController.isLoggedIn, gigController.gigForm);

router
  .route('/:id')
  .get(gigController.getGig)
  .put(authenticationController.checkGigOwnership, gigController.updateGig)
  .delete(authenticationController.checkGigOwnership, gigController.deleteGig);

router
.route('/:id/edit')
.get(authenticationController.checkGigOwnership, gigController.editGigForm);

module.exports = router