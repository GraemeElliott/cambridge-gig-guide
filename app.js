const express = require('express'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      LocalStrategy = require('passport-local').Strategy,
      methodOverride = require('method-override'),
      flatpickr = require("flatpickr"),
      flash = require('connect-flash'),

      User = require('./models/userModel'),
      
      indexRouter = require('./routes/indexRoutes'),
      gigRouter = require('./routes/gigRoutes'),
      venueRouter = require('./routes/venueRoutes'),
      userRouter = require('./routes/userRoutes');

const app = express();

app.use(flash());

// PASSPORT CONFIGURATION
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//PASSPORT CONFIGURATION END

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.json());
app.use("/assets", express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// MIDDLEWARE END

//ROUTES
app.use('/', indexRouter, userRouter);
app.use('/gigs', gigRouter);
app.use('/venues', venueRouter);
app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  next(res.render("error"));
});

// ROUTES END

module.exports = app;



