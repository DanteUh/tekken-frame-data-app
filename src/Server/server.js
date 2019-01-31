/* eslint-disable */

/* Packages imports */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Project files import */
const dbConfig = require('./config/database.config.js');
const Character = require('./models/characterModel');
const CharacterName = require('./models/characterNameModel.js');
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

routes(app);

app.listen(port, () => {
  console.log(`Restful API started on port: ${port}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

module.exports = app;
