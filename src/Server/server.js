/* eslint-disable */

/* Packages imports */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

/* Project files import */
const dbConfig = require('./config/database.config.js');
require('./models/characterModel');
require('./models/characterNameModel.js');
const routes = require('./routes/appRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
  }).then(() => {
    console.log('Successfully connected to the database');
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Express app setup
const app = express();
const port = process.env.Port || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.noCache());

routes(app);

app.listen(port, () => {
  console.log(`Restful API started on port: ${port}`);
});

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Cache-Control': 'max-age=2678400'
  });

  next();
});

module.exports = app;
