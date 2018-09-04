/* eslint-disable */
const mongoose = require('mongoose');
const Character = mongoose.model('CharacterModel');

/* Characters */
exports.get_characters = (req, res) => {
  Character.find({}, (err, characters) => {
    err ? res.send(err) : res.json(characters);
  });
};

/* Character */
exports.add_character = (req, res) => {
  const new_character = new Character(req.body);
  new_character.save(
    {new: true},
    (err, character) => {
      err ? res.send(err) : res.json(character)
    }
  );
};

exports.update_character = (req, res) => {
  Character.findOneAndUpdate(
    {name: req.params.characterName},
    req.body,
    {new: true},
    (err, character) => {
      err ? res.send(err) : res.json(character)
    }
  );
};
