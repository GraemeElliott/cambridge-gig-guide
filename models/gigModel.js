
const mongoose = require('mongoose');
const slugify = require('slugify');
const moment = require('moment');

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
  imageId: String,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  youtube: String,
  youtubeVideoID: String,
  spotify: String,
  bandcamp: String,
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

gigSchema.gigQuery = function(uniqueOperations) {
  return new Promise(async function(resolve, reject) {
    let aggOperations = uniqueOperations.concat([
      {$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument"}},
      {$project: {
        name: 1,
        nameForUrl: 1,
        venue: 1,
        image: 1,
        date: 1,
        dateAdded: 1,
        author: {$arrayElemAt: ['$authorDocument', 0]}
      }}
    ]);
    let gigs = await gigsCollection.aggregate(aggOperations).toArray(); // Doesn't work    

    // clean up author property in each post object
    gigs = gigs.map(function(gig) {
      gig.author = {
        username: gig.author.username,
      };
      return gig;
    });
    resolve(gigs);
  });
};

Gig.findByAuthorId = function(authorId) {
  return gigSchema.gigQuery([
    {$match: {author: authorId}},
    {$sort: {dateAdded: -1}}
  ]);
};

module.exports = Gig;