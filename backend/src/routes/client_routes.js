const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const ClientService = require('../api/services/client_services');
const ClientController = require('../api/controllers/client_controller');

const clientService = new ClientService();
const clientController = new ClientController(clientService);

router.get('/clients', /*auth, */clientController.list);
router.get('/clients/:id', /*auth, */clientController.show);
router.post('/clients', /*auth, */clientController.store);
router.patch('/clients/:id', /*auth, */clientController.update);
router.delete('/clients/:id', /*auth, */clientController.delete);

module.exports = router;