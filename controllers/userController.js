const User = require('../models/userModel');
const Gig = require('../models/gigModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.ifUserExists = function(req, res, next) {
  User.findByUsername(req.params.username)
  .then(function(userDocument) {
    req.profileUser = userDocument
    next()
  }).catch(function() {
    res.render('error')
  });
};

exports.profilePage = function(req, res) {
  Gig.findByAuthorId (req.params.username)
  res.render('users/user-profile', {
    profileUsername: req.profileUser.username,
  });
};