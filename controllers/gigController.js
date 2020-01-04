//For Cloudinary
const { cloudinary, upload } = require("../models/cloudinary");

const Gig = require('../models/gigModel');
const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const multer = require('multer');

exports.gigForm = async (req, res) => {
  res.render('gigs/new-gig');
};

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const gigs = await Gig.find();
  res.render('gigs/all-gigs', {gigs: gigs});
});

exports.getGig = catchAsync(async (req, res, next) => {
  const gig = await Gig.findOne({ nameForUrl: req.params.id }, (error, gigPage) => {
    if (!gigPage) {
      return next (new AppError('There is no gig with that name', 404))
    } else {
      res.render("gigs/show-gig", { gig: gigPage });
    }
  });
});

exports.createGig = async (req, res) => {
  if (!req.file) {
    req.flash("error", "Please fill out this field");
    return res.redirect("back");
  };

  // try/catch for async + await code
  try {
    let name = req.body.name;
    let nameForUrl = req.body.nameForUrl;
    let supports = req.body.supports;
    let venue = req.body.venue;
    let venueForUrl = req.body.venueForUrl;
    let date = req.body.date;
    let ticketsUrl = req.body.ticketsUrl;
    let price = req.body.price;
    let website = req.body.website;
    let facebook = req.body.facebook;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let youtube = req.body.youtube;
    let youtubeVideoID = req.body.youtubeVideoID;
    let spotify = req.body.spotify;
    let bandcamp = req.body.bandcamp;
    let description = req.body.description;
    let dateAdded = req.body.dateAdded;
    let author = {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
    };

    // upload image to cloudinary and set resulting url to image variable
    let result = await cloudinary.v2.uploader.upload(req.file.path);
    let image = result.secure_url;
    let imageId = result.public_id;

    //get data from form and add to gigs array
    let newGig = {
      name: name,
      nameForUrl: nameForUrl,
      supports: supports,
      image: image,
      imageId: imageId,
      author: author,
      venue: venue,
      venueForUrl: venueForUrl,
      date: date,
      ticketsUrl: ticketsUrl,
      price: price,
      website: website,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      youtube: youtube,
      youtubeVideoID: youtubeVideoID,
      spotify: spotify,
      bandcamp: bandcamp,
      description: description,
      dateAdded: dateAdded
    };

    //Create a new gig and save it to the database
    await Gig.create(newGig);
    console.log(newGig);
  } catch (error) {
    console.log (error);
  }
  res.redirect("/gigs");
};

exports.editGigForm = catchAsync(async (req, res) => {
  await Gig.findOne({ nameForUrl: req.params.id }, 
    (error, editGig) => {
      res.render('gigs/edit-gig', { gig: editGig });
    });
});

exports.updateGig = async (req, res) => {
  await Gig.findOneAndUpdate(
    { nameForUrl: req.params.id },
    req.body.gig,
    async function(error, gig) {
      if (error) {
        res.redirect('back');
      } else {
        if (req.file) {
          // try/catch for async + await code
          try {
            await cloudinary.v2.uploader.destroy(gig.imageId);
            let result = await cloudinary.v2.uploader.upload(req.file.path);
            gig.image = result.secure_url;
            gig.imageId = result.public_id;

          } catch (error) {
            console.log(error);
            return res.redirect('back');
          };
        };
        gig.name = req.body.gig.name;
        gig.nameForUrl = req.body.gig.nameForUrl;
        gig.supports = req.body.gig.supports;
        gig.venue = req.body.gig.venue;
        gig.venueForUrl = req.body.gig.venueForUrl;
        gig.date = req.body.gig.date;
        gig.ticketsUrl = req.body.gig.ticketsUrl;
        gig.price = req.body.gig.price;
        gig.website = req.body.gig.website;
        gig.facebook = req.body.gig.facebook;
        gig.twitter = req.body.gig.twitter;
        gig.instagram = req.body.gig.instagram;
        gig.youtube = req.body.gig.youtube;
        gig.youtubeVideoID = req.body.gig.youtubeVideoID;
        gig.spotify = req.body.gig.spotify;
        gig.bandcamp = req.body.gig.bandcamp;
        gig.description = req.body.gig.description;
        gig.save();
        res.redirect('/gigs/');
      }
    }
  );
};

exports.deleteGig = catchAsync(async (req, res) => {
  await Gig.findOneAndRemove(
    { nameForUrl: req.params.id},
    req.body.gig, async (error, gig) => {
      if (error) {
        res.redirect ('back')
      } else {
        let result = await cloudinary.v2.uploader.destroy(gig.imageId);
        gig.image = result.secure_url;
        gig.imageId = result.public_id;
        res.redirect ('/gigs')
      }
    }
  )
});
