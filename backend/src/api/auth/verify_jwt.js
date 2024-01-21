const jwt = require('jsonwebtoken');
const { unauthorized } = require('../../config/status_error');
const blacklist = require('../../utils/blacklist');
const { SECRET } = require('../../config/environment');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-acess-token'];
  const index = blacklist.findIndex(item => item === token);

  if (index !== -1) {
    return res.status(401).send(unauthorized);
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send(unauthorized);
    }

    req.userID = decoded.userID;
    next();
  });
};

module.exports = verifyJWT;