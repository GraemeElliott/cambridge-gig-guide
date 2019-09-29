const mongoose = require('mongoose');
const slugify = require('slugify');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  nameForUrl: String,
  image: String,
  description: String,
  facebook: String,
  twitter: String,
  instagram: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    role: String,
    photo: String,
  }
});

//DOCUMENT MIDDLEWARE: runs before .save() and .create()
venueSchema.pre('save', function (next) {
  this.nameForUrl = slugify(this.name, { lower: true });
  next();
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;