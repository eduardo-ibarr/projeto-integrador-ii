const mongoose = require('mongoose');

const string = 'mongodb://localhost:27017/web-pi-ii';

const connection = mongoose.connect(string, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

module.exports = connection;