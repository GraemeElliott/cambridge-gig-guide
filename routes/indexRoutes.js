const express = require('express');
const indexController = require('../controllers/indexController');
const authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router
  .route('/')
  .get(indexController.getAllGigs);

module.exports = router