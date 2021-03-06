const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router
  .route('/')
  .get(indexController.getAllGigs);

  router
  .route('/contact-us')
  .get(indexController.contactUs)
  .post(indexController.contactFormSubmit);

module.exports = router