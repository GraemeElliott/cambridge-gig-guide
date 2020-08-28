const User = require('../models/userModel'),
      Gig = require('../models/gigModel'),
      Venue = require('../models/venueModel'),
      catchAsync = require('../utilities/catchAsync'),
      passport = require('passport'),
      moment = require('moment');


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
      req.flash("error", "Registration unsuccessful");
      return res.render('index/register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/users/' + user.username);
    });
  });
});

//LOGIN / LOGOUT
exports.loginForm = async (req, res) => {
  res.render('index/login');
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { return req.flash("error", "Incorrect username and/or password"), res.redirect('/login'); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return req.flash("success", "Successfully logged in"), res.redirect('/users/' + user.username);
    });
  })(req, res, next);
};

exports.logout = async (req, res) => {
    req.logout();
    req.flash("success", "You have successfully logged out")
    res.redirect('/');
  };

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in to do that")
  res.redirect('/login');
});

// USER PROFILE
exports.userProfile = catchAsync(async (req, res) => {

  User.findOne({ username: req.params.id}, function (err, foundUser) {
    if (err) {
      res.redirect('back');
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
          req.flash("error", "Gig does not exist")
          res.redirect('back')
        } else {
          if (editGig.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that")
            res.redirect('back');
          };          
        };
    });
  } else {
    req.flash("error", "You must be logged in to do that")
    res.redirect('back');
  };
});

exports.checkVenueOwnership = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    await Venue.findOne({ nameForUrl: req.params.id }, 
      (error, editVenue) => {
        if (error) {
          req.flash("error", "Venue does not exist")
          res.redirect('back')
        } else {
          if (editVenue.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that")
            res.redirect('back');
          };          
        };
    });
  } else {
    req.flash("error", "You must be logged in to do that")
    res.redirect('back');
  };
});
