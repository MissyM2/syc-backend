const mongoose = require('mongoose');

const closetitemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  seasons: {
    type: [String],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Closetitem', closetitemSchema);
