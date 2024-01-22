const router = require('express').Router();

const WorkService = require('../services/work_services');
const WorkController = require('../controllers/work_controller');

const workService = new WorkService();
const workController = new WorkController(workService);

router.get('/works', workController.list.bind(workController));
router.get('/works/:id', workController.show.bind(workController));
router.post('/works', workController.store.bind(workController));
router.patch('/works/:id', workController.update.bind(workController));
router.delete('/works/:id', workController.delete.bind(workController));

module.exports = router;