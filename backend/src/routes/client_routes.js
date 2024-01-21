const router = require('express').Router();

const ClientService = require('../services/client_services');
const ClientController = require('../controllers/client_controller');

const clientService = new ClientService();
const clientController = new ClientController(clientService);

router.get('/clients', clientController.list);
router.get('/clients/:id', clientController.show);
router.post('/clients', clientController.store);
router.patch('/clients/:id', clientController.update);
router.delete('/clients/:id', clientController.delete);

module.exports = router;