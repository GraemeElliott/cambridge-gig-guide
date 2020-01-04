const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema ({
  name: {
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
    required: [true, 'Please provide a valid username'],
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
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // Works on .save() and .create() only
      validator: function (element) {
        return element === this.password;
      },
      message: 'Passwords do not match',
    },
  },
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
