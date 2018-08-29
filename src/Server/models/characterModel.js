const mongoose = require('mongoose');
const Moves = require('./moveModel');

const CharacterSchema = new mongoose.Schema({
  name: String,
  moves: [Moves],
});

mongoose.model('CharacterModel', CharacterSchema);

module.exports = CharacterSchema;
