const Venue = require('../models/venueModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.venueForm = async (req, res) => {
  res.render('venues/new-venue');
};

exports.getAllVenues = catchAsync(async (req, res, next) => {
  const venues = await Venue.find();
  res.render('venues/all-venues', {venues: venues});
});

exports.getVenue = catchAsync(async (req, res, next) => {
  const venue = await Venue.findOne({ nameForUrl: req.params.id }, (error, venuePage) => {
    if (error) {
      console.log(error);
    } else {
      res.render("venues/show-venue", { venue: venuePage });
    }
  });
});

exports.createVenue = async (req, res) => {
  // try/catch for async + await code

  try {
    let name = req.body.name;
    let nameForUrl = req.body.nameForUrl;
    let image = req.body.image;
    let facebook = req.body.facebook;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let description = req.body.description;
    let author = {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      photo: req.user.photo,
    };

    //get data from form and add to gigs array
    let newVenue = {
      name: name,
      nameForUrl: nameForUrl,
      image: image,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      description: description,
      author: author
    };

    //Create a new gig and save it to the database
    await Venue.create(newVenue);
    console.log(newVenue);
  } catch (error) {
    console.log (error);
  }
  res.redirect("/venues");
};

exports.editVenueForm = catchAsync(async (req, res) => {
  await Venue.findOne({ nameForUrl: req.params.id }, 
    (error, editVenue) => {
      res.render('venues/edit-venue', { venue: editVenue });
    });
});

exports.updateVenue = catchAsync(async (req, res) => {
  await Venue.findOneAndUpdate(
    { nameForUrl: req.params.id },
    req.body.venue,
    function(error, updatedGig) {
      if (error) {
        res.redirect('/venues');
      } else {
        res.redirect('/venues/');
      }
    }
  );
});

exports.deleteVenue = catchAsync(async (req, res) => {
  await Venue.findOneAndRemove(
    { nameForUrl: req.params.id},
    req.body.venue, (error) => {
      if (error) {
        res.redirect ('/venues')
      } else {
        res.redirect ('/venues')
      }
    }
  )
});
