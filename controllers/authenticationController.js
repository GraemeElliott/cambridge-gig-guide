const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// REGISTER
exports.registerForm = async (req, res) => {
  res.render('index/register');
};

exports.register = catchAsync(async (req, res, next) => {
  var newUser = new User(
    {name: req.body.name, 
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation
  });
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      console.log (error);
      return res.render('index/register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

//LOGIN / LOGOUT
exports.loginForm = async (req, res) => {
  res.render('index/login');
};

exports.login = passport.authenticate('local',
  {
    successRedirect: "/",
    failureRedirect: "/login"
  });

exports.logout = async (req, res) => {
    req.logout();
    res.redirect('/');
  };

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
});

