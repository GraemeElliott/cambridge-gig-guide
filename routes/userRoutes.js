const express = require('express');
const authenticationController = require('../controllers/authenticationController');
const passport = require('passport');

const router = express.Router();

router
  .route('/register')
  .get(authenticationController.isLoggedIn,authenticationController.registerForm)
  .post(authenticationController.register);

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

router
.route('/password-reset')
.get(authenticationController.forgotPassword)
.post(authenticationController.passwordResetEmail);

router
.route('/reset/:token')
.get(authenticationController.passwordResetForm)
.post(authenticationController.passwordReset);

module.exports = router