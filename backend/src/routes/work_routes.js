const router = require('express').Router();

//const auth = require('../api/auth/verify_jwt');

const WorkService = require('../api/services/work_services');
const WorkController = require('../api/controllers/work_controller');

const workService = new WorkService();
const workController = new WorkController(workService);

router.get('/works', /*auth, */workController.list);
router.get('/works/:id', /*auth, */workController.show);
router.post('/works', /*auth, */workController.store);
router.patch('/works/:id', /*auth, */workController.update);
router.delete('/works/:id', /*auth, */workController.delete);

module.exports = router;