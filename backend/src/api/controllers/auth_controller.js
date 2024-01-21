const loginService = require('../services/auth/login');
const logoffService = require('../services/auth/logoff');

class Auth {
  login(req, res) {
    loginService(req, res);
  }

  logoff(req, res) {
    logoffService(req, res);
  }
}

module.exports = new Auth;