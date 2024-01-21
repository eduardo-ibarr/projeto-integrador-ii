const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  SECRET: process.env.SECRET,
  URL_USER: process.env.URL_USER,
  URL_PASSWORD: process.env.URL_PASSWORD,
  URL_HOST: process.env.URL_HOST,
  PORT: process.env.PORT || process.env.port || 5050,
};