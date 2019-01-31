const mongoose = require('mongoose');

const CharacterNameSchema = new mongoose.Schema({
  name: String,
});

mongoose.model('CharacterNameModel', CharacterNameSchema);

module.exports = CharacterNameSchema;
