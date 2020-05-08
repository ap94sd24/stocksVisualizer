const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  username: {
    type: String, 
    required: false
  }
});

module.exports = Test = mongoose.model('test', TestSchema);