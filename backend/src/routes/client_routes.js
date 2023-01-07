const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const UserController = require('../api/controllers/client_controller');

router.get('/clients', /*auth, */UserController.read);
router.get('/clients/:id', /*auth, */UserController.readOne);
router.post('/clients', /*auth, */UserController.create);
router.patch('/clients/:id', /*auth, */UserController.update);
router.delete('/clients/:id', /*auth, */UserController.delete);

module.exports = router;