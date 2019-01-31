/* eslint-disable */
const character = require('../controllers/characterController.js');

module.exports = (app) => { 
  app.route('/characters')
    .get(character.get_characters)
    .post(character.add_character);
  
  app.route('/characters/name')
    .get(character.get_characters_name)
    .post(character.add_characters_name)

  
  app.route('/characters/:characterName')
    .get(character.get_character)
    .put(character.update_character);
};
