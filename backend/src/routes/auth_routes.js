const router = require('express').Router();

const AuthController = require('../api/controllers/auth_controller');

router.post('/login', AuthController.login);
router.post('/logoff', AuthController.logoff);

module.exports = router;