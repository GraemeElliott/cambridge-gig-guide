const express = require('express');
const gigController = require('../controllers/gigController');

const router = express.Router();

router
  .route('/')
  .get(gigController.getAllGigs)
  .post(gigController.createGig);

router
  .route('/new')
  .get(gigController.gigForm);

router
  .route('/:id')
  .get(gigController.getGig);

module.exports = router