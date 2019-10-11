const Gig = require('../models/gigModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.gigForm = async (req, res) => {
  res.render('gigs/new-gig');
};

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const gigs = await Gig.find();
  res.render('gigs/all-gigs', {gigs: gigs});
});

exports.getGig = catchAsync(async (req, res, next) => {
  const gig = await Gig.findOne({ nameForUrl: req.params.id }, (error, gigPage) => {
    if (error) {
      console.log(error);
    } else {
      res.render("gigs/show-gig", { gig: gigPage });
    }
  });
});

exports.createGig = async (req, res) => {
  // try/catch for async + await code

  try {
    let name = req.body.name;
    let nameForUrl = req.body.nameForUrl;
    let supports = req.body.supports;
    let image = req.body.image;
    let venue = req.body.venue;
    let venueForUrl = req.body.venueForUrl;
    let date = req.body.date;
    let ticketsUrl = req.body.ticketsUrl;
    let price = req.body.price;
    let facebook = req.body.facebook;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let youtube = req.body.youtube;
    let youtubeVideo = req.body.youtubeVideo;
    let spotifyPlayer = req.body.spotifyPlayer;
    let bandcamp = req.body.bandcamp;
    let bandcampPlayer = req.body.bandcampPlayer;
    let description = req.body.description;
    let dateAdded = req.body.dateAdded;
    let author = {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      photo: req.user.photo,
    };

    //get data from form and add to gigs array
    let newGig = {
      name: name,
      nameForUrl: nameForUrl,
      supports: supports,
      image: image,
      author: author,
      venue: venue,
      venueForUrl: venueForUrl,
      date: date,
      ticketsUrl: ticketsUrl,
      price: price,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      youtube: youtube,
      youtubeVideo: youtubeVideo,
      spotifyPlayer: spotifyPlayer,
      bandcamp: bandcamp,
      bandcampPlayer: bandcampPlayer,
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

exports.updateGig = catchAsync(async (req, res) => {
  await Gig.findOneAndUpdate(
    { nameForUrl: req.params.id },
    req.body.gig,
    function(error, updatedGig) {
      if (error) {
        res.redirect('/gigs');
      } else {
        res.redirect('/gigs/');
      }
    }
  );
});

exports.deleteGig = catchAsync(async (req, res) => {
  await Gig.findOneAndRemove(
    { nameForUrl: req.params.id},
    req.body.gig, (error) => {
      if (error) {
        res.redirect ('/gigs')
      } else {
        res.redirect ('/gigs')
      }
    }
  )
});

