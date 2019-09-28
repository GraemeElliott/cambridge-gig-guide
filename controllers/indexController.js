const Gig = require('../models/gigModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const gigs = await Gig.find();
  res.render('index', {gigs: gigs})
});