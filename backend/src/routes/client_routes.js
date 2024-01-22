const router = require('express').Router();

const ClientService = require('../services/client_services');
const ClientController = require('../controllers/client_controller');

const clientService = new ClientService();
const clientController = new ClientController(clientService);

router.get('/clients', clientController.list.bind(clientController));
router.get('/clients/:id', clientController.show.bind(clientController));
router.post('/clients', clientController.store.bind(clientController));
router.patch('/clients/:id', clientController.update.bind(clientController));
router.delete('/clients/:id', clientController.delete.bind(clientController));

module.exports = router;