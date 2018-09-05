/* eslint-disable */
const character = require('../controllers/characterController.js');

module.exports = (app) => { 
  app.route('/characters')
    .get(character.get_characters)
    .post(character.add_character);
  
  app.route('/characters/:characterName')
    .put(character.update_character);
};
