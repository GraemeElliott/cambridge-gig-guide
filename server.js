const mongoose = require('mongoose'),
      dotenv = require('dotenv');

process.on('uncaughtException', (error) => {
  console.log ('Uncaught Exception. Shutting down...');
  console.log (error.name, error.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log ("DB connection successful"));

const port = process.env.PORT || 5500;
const server = app.listen (port, () => {
  console.log(`App running on port ${port}...`);
});

process.on ('unhandledRejection', (error) => {
  console.log (error.name, error.message);
  console.log ('Unahndled Rejection. Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});