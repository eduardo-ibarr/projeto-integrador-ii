const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const ServiceController = require('../api/controllers/service_controller');

router.get('/services', /*auth, */ServiceController.read);
router.get('/services/:id', /*auth, */ServiceController.readOne);
router.post('/services', /*auth, */ServiceController.create);
router.patch('/services/:id', /*auth, */ServiceController.update);
router.delete('/services/:id', /*auth, */ServiceController.delete);

module.exports = router;