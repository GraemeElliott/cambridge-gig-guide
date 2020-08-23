const User = require('../models/userModel');
const Gig = require('../models/gigModel');
const Venue = require('../models/venueModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const passport = require('passport');
const moment = require('moment');

// REGISTER
exports.registerForm = async (req, res) => {
  res.render('index/register');
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = new User(
    {firstName: req.body.firstName,
    lastName: req.body.lastName, 
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

exports.login = async (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
};

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

// USER PROFILE
exports.userProfile = catchAsync(async (req, res) => {

  User.findOne({ username: req.params.id}, function (err, foundUser) {
    if (err) {
      console.log(err)
      res.redirect('/');
    }
    Gig.find().where('author.id').equals(foundUser._id).exec(function(err, gigs) {

      const sortedGigs = gigs.sort((a, b) => {
        return Date.parse(new Date(a.date)) - Date.parse(new Date(b.date));
      });
      

      res.render('users/user-profile', {user: foundUser, moment:moment, sortedGigs:sortedGigs})
    });
    }
  )

});

// CHECK OWNERSHIP
exports.checkGigOwnership = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    await Gig.findOne({ nameForUrl: req.params.id }, 
      (error, editGig) => {
        if (error) {
          res.redirect('back')
        } else {
          if (editGig.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          };          
        };
    });
  } else {
    res.redirect('back');
  };
});

exports.checkVenueOwnership = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    await Venue.findOne({ nameForUrl: req.params.id }, 
      (error, editVenue) => {
        if (error) {
          res.redirect('back')
        } else {
          if (editVenue.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          };          
        };
    });
  } else {
    res.redirect('back');
  };
});
