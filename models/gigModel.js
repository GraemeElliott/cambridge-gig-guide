const mongoose = require('mongoose');
const slugify = require('slugify');
const moment = require('moment');
const User = require('./userModel');


const gigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A gig must have a name'],
    trim: true,
    maxlength: [40],
    minlength: [1],
  },
  nameForUrl: String,
  gigId: {
    type: String,
    unique: true
  },
  supports: String,
  venue: {
    type: String,
    required: [true, 'A gig must have a venue (you can use TBA if not known)']
  },
  venueForUrl: String,
  date: {
    type: Date,
    required: [true, 'A gig must have a date']
  },
  ticketsUrl: {
    type: String,
    required: [true, 'A gig must have a URL for ticket purchases']
  },
  price: {
    type: Number,
    required: [true, 'A gig must have a price']
  },
  image: {
    type: String,
    //required: [true, 'A gig must have an image']
  },
  facebook: String,
  twitter: String,
  instagram: String,
  youtube: String,
  youtubeVideo: String,
  spotifyPlayer: String,
  bandcamp: String,
  bandcampPlayer: String,
  description: {
    type: String,
    required: [true, 'A gig must have a description']
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    role: String,
    photo: String
  }
});

//DOCUMENT MIDDLEWARE: runs before .save() and .create()
gigSchema.pre('save', function (next) {
  this.nameForUrl = slugify(this.name, { lower: true });
  next();
});

gigSchema.pre('save', function (next) {
  this.venueForUrl = slugify(this.venue, { lower: true });
  next();
});

gigSchema.pre('save', function (next) {
  const gigDate = this.date;
  const bandName = slugify(this.name, { lower: true });
  this.gigId = `${bandName}-${moment(gigDate).format('YYYYMMDD')}`;
  next();
});

const Gig = mongoose.model('Gig', gigSchema);

module.exports = Gig;