const Gig = require('../models/gigModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const moment = require("moment");

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const gigs = await Gig.find();

  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const startDate = new Date();
  const endDate = new Date(y, m + 3, 0);
  
  const gigDataFiltered = gigs.filter(function (gig) {
    var gigDate = new Date(gig.date)
    return (gigDate >= startDate && gigDate <= endDate)
  });
          
  const upcommingGigs = gigDataFiltered.sort((a, b) => {
    return Date.parse(new Date(a.date)) - Date.parse(new Date(b.date));
  }).slice (0, 6);

  let newlyReleasedSorted = gigs.sort((a, b) => {
    return Date.parse(new Date(a.dateAdded)) - Date.parse(new Date(b.dateAdded));
  }).reverse();

  const newlyReleasedGigs = newlyReleasedSorted.slice(0, 6);

  res.render('index', {gigs: gigs, moment: moment, upcommingGigs:upcommingGigs, newlyReleasedGigs:newlyReleasedGigs})
});