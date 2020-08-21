//For Cloudinary
const { cloudinary, upload } = require("../models/cloudinary");

const Gig = require('../models/gigModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const multer = require('multer');
const moment = require("moment");
const { db, count } = require("../models/gigModel");

exports.gigForm = async (req, res) => {
  res.render('gigs/new-gig');
};

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const gigs = await Gig.find();

  const sortedGigs = gigs.sort((a, b) => {
    return Date.parse(new Date(a.date)) - Date.parse(new Date(b.date));
  });

  res.render('gigs/all-gigs', {gigs: gigs, moment: moment, sortedGigs:sortedGigs});
});

exports.getGig = catchAsync(async (req, res, next) => {
  const gig = await Gig.findOne({ nameForUrl: req.params.id }, (error, gigPage) => {
    if (error) {
      console.log(error);
    } else {
      res.render("gigs/show-gig", { gig: gigPage, moment: moment });
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
    let dateCalendar = req.body.dateCalendar;
    let ticketsUrl = req.body.ticketsUrl;
    let price = req.body.price;
    let website = req.body.website;
    let facebook = req.body.facebook;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let youtube = req.body.youtube;
    let youtubeVideo = req.body.youtubeVideoID;
    let spotifyPlayer = req.body.spotifyPlayer;
    let description = req.body.description;
    let dateAdded = req.body.dateAdded;
    let author = {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      photo: req.user.photo,
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
      dateCalendar: dateCalendar,
      ticketsUrl: ticketsUrl,
      price: price,
      website:website,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      youtube: youtube,
      youtubeVideo: youtubeVideoID,
      spotifyPlayer: spotifyPlayer,
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
        gig.dateCalendar = req.body.gig.dateCalendar;
        gig.ticketsUrl = req.body.gig.ticketsUrl;
        gig.price = req.body.gig.price;
        gig.website = req.body.gig.website;
        gig.facebook = req.body.gig.facebook;
        gig.twitter = req.body.gig.twitter;
        gig.instagram = req.body.gig.instagram;
        gig.youtube = req.body.gig.youtube;
        gig.youtubeVideo = req.body.gig.youtubeVideoID;
        gig.spotifyPlayer = req.body.gig.spotifyPlayer;
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

