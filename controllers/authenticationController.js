const User = require('../models/userModel');
const Gig = require('../models/gigModel');
const Venue = require('../models/venueModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const passport = require('passport');

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

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

