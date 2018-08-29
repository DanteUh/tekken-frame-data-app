const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost/tekken-frame-data-app',
  { useNewUrlParser: true },
);

// Express app setup
const app = express();
const port = process.env.Port || 8080;
app.use(bodyParser.json());
app.use(cors());

app.listen(port);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

module.exports = app;

console.log(`Restful API started on port: ${port}`);
