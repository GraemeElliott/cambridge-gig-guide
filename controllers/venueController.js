//For Cloudinary
const { cloudinary, upload } = require("../models/cloudinary"),
      Venue = require('../models/venueModel'),
      Gig = require('../models/gigModel'),
      catchAsync = require('../utilities/catchAsync'),
      multer = require('multer'),
      moment = require("moment");

exports.venueForm = async (req, res) => {
  res.render('venues/new-venue');
};

exports.getAllVenues = catchAsync(async (req, res, next) => {
  const venues = await Venue.find();

  const sortedVenues = venues.sort(function(a, b){
    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
})

  res.render('venues/all-venues', {venues: venues, sortedVenues:sortedVenues});
});

exports.getVenue = catchAsync(async (req, res, next) => {
  const venue = await Venue.findOne({ nameForUrl: req.params.id }, (error, venue) => {
    if (error) {
      res.render("error", { venue: venue });
    } else {
      Gig.find().where('venueForUrl').equals(venue.nameForUrl).exec(function(err, gigs) {
        const sortedGigs = gigs.sort((a, b) => {
          return Date.parse(new Date(a.date)) - Date.parse(new Date(b.date));
        });
      res.render("venues/show-venue", { venue: venue, moment: moment, gigs: gigs, sortedGigs:sortedGigs });
      })
    }
  });
});

exports.createVenue = async (req, res) => {
  if (!req.file) {
    req.flash("error", "Please fill out this field");
    return res.redirect("back");
  };

  // try/catch for async + await code
  try {
    let name = req.body.name;
    let nameForUrl = req.body.nameForUrl;
    let website = req.body.website;
    let facebook = req.body.facebook;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let youtube = req.body.youtube;
    let description = req.body.description;
    let author = {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      photo: req.user.photo,
    };

    // upload image to cloudinary and set resulting url to image variable
    let result = await cloudinary.uploader.upload(req.file.path);
    let image = result.secure_url;

    //get data from form and add to gigs array
    let newVenue = {
      name: name,
      website:website,
      nameForUrl: nameForUrl,
      image: image,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      yotube:youtube,
      description: description,
      author: author
    };

    //Create a new gig and save it to the database
    await Venue.create(newVenue);
  } catch (error) {
  }
  req.flash("success", "Venue successfully created")
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
        req.flash("error", "Something went wrong")
        res.redirect('/venues');
      } else {
        req.flash("success", "Gig successfully updated")
        res.redirect('/venues/' + venue.nameForUrl);
      }
    }
  );
});

exports.deleteVenue = catchAsync(async (req, res) => {
  await Venue.findOneAndRemove(
    { nameForUrl: req.params.id},
    req.body.venue, (error) => {
      if (error) {
        req.flash("error", "Something went wrong")
        res.redirect ('/venues')
      } else {
        req.flash("success", "Gig successfully deleted")
        res.redirect ('/venues')
      }
    }
  )
});
