const express = require('express'),
      bodyParser = require('body-parser'),
      AppError = require('./utilities/appError'),
      
      indexRouter = require('./routes/indexRoutes'),
      gigRouter = require('./routes/gigRoutes'),
      venueRouter = require('./routes/venueRoutes');

const app = express();

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));

// MIDDLEWARE END

app.use('/', indexRouter);
app.use('/gigs', gigRouter);
app.use('/venues', venueRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ROUTES END

module.exports = app;



