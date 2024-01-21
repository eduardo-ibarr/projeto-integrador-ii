const router = require('express').Router();

const WorkService = require('../services/work_services');
const WorkController = require('../controllers/work_controller');

const workService = new WorkService();
const workController = new WorkController(workService);

router.get('/works', workController.list);
router.get('/works/:id', workController.show);
router.post('/works', workController.store);
router.patch('/works/:id', workController.update);
router.delete('/works/:id', workController.delete);

module.exports = router;