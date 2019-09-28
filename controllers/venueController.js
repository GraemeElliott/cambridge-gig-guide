const Venue = require('../models/venueModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.getAllVenues = catchAsync(async (req, res, next) => {

  res.status(200).render ('all-venues', {
    title: 'Cambridge Gig Guide | Venues',
  });
});