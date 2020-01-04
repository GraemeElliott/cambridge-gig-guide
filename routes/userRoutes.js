const express = require('express');
const authenticationController = require('../controllers/authenticationController');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/register')
  .get(authenticationController.restrictTo('admin'), authenticationController.registerForm)
  .post(authenticationController.isLoggedIn, authenticationController.register);

router
  .route('/login')
  .get(authenticationController.loginForm)
  .post(authenticationController.login);

router
.route('/logout')
.get(authenticationController.logout);

router
.route('/profile/:username')
.get(userController.ifUserExists, userController.profilePage);

module.exports = router