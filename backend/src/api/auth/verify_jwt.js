const jwt = require('jsonwebtoken');
const { unauthorized } = require('../../constants/status_error');
const blacklist = require('../../utils/blacklist');

require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-acess-token'];
  const index = blacklist.findIndex(item => item === token);

  if (index !== -1) {
    return res.status(401).send(unauthorized);
  }

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send(unauthorized);
    }

    req.userID = decoded.userID;
    next();
  });
};

module.exports = verifyJWT;