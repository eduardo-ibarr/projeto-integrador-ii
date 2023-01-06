const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const UserController = require('../api/controllers/client_controller');

router.get('/clientes', /*auth, */UserController.read);
router.get('/clientes/:id', /*auth, */UserController.readOne);
router.post('/novo_cliente', /*auth, */UserController.create);
router.put('/clientes/:id', /*auth, */UserController.update);
router.delete('/clientes/:id', /*auth, */UserController.delete);

module.exports = router;