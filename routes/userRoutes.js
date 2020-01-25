const express = require('express');
const authenticationController = require('../controllers/authenticationController');
const passport = require('passport');

const router = express.Router();

router
  .route('/register')
  .get(authenticationController.registerForm)
  .post(authenticationController.isLoggedIn, authenticationController.register);

router
  .route('/login')
  .get(authenticationController.loginForm)
  .post(authenticationController.login);

router
.route('/logout')
.get(authenticationController.logout);

router
.route('/users/:id')
.get(authenticationController.isLoggedIn, authenticationController.userProfile);

module.exports = router