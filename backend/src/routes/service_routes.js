const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const ServiceController = require('../api/controllers/service_controller');

router.get('/servicos', /*auth, */ServiceController.read);
router.get('/servicos/:id', /*auth, */ServiceController.readOne);
router.post('/novo_servico', /*auth, */ServiceController.create);
router.put('/servicos/:id', /*auth, */ServiceController.update);
router.delete('/servicos/:id', /*auth, */ServiceController.delete);

module.exports = router;