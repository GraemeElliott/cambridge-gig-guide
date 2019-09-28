const Gig = require('../models/gigModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.gigForm = async (req, res) => {
  res.render('new-gig');
};

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const gigs = await Gig.find();
  res.render('all-gigs', {gigs: gigs});
});

exports.getGig = catchAsync(async (req, res, next) => {
  const gig = await Gig.findOne({ nameForUrl: req.params.id }, (error, gigPage) => {
    if (error) {
      console.log(error);
    } else {
      res.render("show-gig", { gig: gigPage });
    }
  });
});

exports.createGig = catchAsync (async(req, res, next) => {
  const newGig = await Gig.create(req.body);
  res.redirect('/gigs');
});