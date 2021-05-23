const { Schema, model } = require('mongoose');
cons;
const Document = new Schema({
  id: String,
  name: String,
  data: Object,
});

module.exports = model('Document', Document);
