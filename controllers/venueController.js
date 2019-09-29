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

exports.createVenue = catchAsync (async(req, res, next) => {
  const newVenue = await Venue.create(req.body);
  res.redirect('/gigs');
});