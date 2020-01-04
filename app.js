const express = require('express'),
      bodyParser = require('body-parser'),
      AppError = require('./utilities/appError'),
      errorHandler = require('./controllers/errorController'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      methodOverride = require('method-override'),

      User = require('./models/userModel'),
      
      indexRouter = require('./routes/indexRoutes'),
      gigRouter = require('./routes/gigRoutes'),
      venueRouter = require('./routes/venueRoutes'),
      userRouter = require('./routes/userRoutes');

const app = express();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
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
  next();
});

//PASSPORT CONFIGURATION END

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.json());
app.use("/assets", express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// MIDDLEWARE END

//ROUTES
app.use('/', indexRouter, userRouter);
app.use('/gigs', gigRouter);
app.use('/venues', venueRouter);
app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ROUTES END 

app.use(errorHandler);

module.exports = app;



