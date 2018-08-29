const mongoose = require('mongoose');

const MoveSchema = new mongoose.Schema({
  command: String,
  hitLevel: String,
  damage: String,
  startUpFrame: String,
  blockFrame: String,
  hitFrame: String,
  counterHitFrame: String,
  notes: String,
});

mongoose.model('MoveModel', MoveSchema);

module.exports = MoveSchema;
