const mongoose = require('mongoose'),
      validator = require('validator'),
      passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    required: [true, 'Please provide your name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  username: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['admin', 'venue-lead', 'promoter'],
    default: 'promoter',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiration: Date,
  active: {
    type: Boolean,
    default: false,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Delete password confirmation field
  this.password = undefined;
  this.passwordConfirmation = undefined;
  next();
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
