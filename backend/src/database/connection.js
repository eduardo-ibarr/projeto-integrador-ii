require('dotenv').config();

const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const string = `mongodb+srv://${process.env.URL_USER}:${process.env.URL_PASSWORD}@${process.env.URL_HOST}/?retryWrites=true&w=majority`;

const connection = mongoose.connect(string, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

module.exports = connection;