const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const AttendanceController = require('../api/controllers/attendance_controller');

router.get('/atendimentos', /*auth, */AttendanceController.read);
router.get('/atendimentos/:id', /*auth, */AttendanceController.readOne);
router.post('/novo_atendimento', /*auth, */AttendanceController.create);
router.put('/atendimentos/:id', /*auth, */AttendanceController.update);
router.patch('/atendimentos/:id', /*auth, */AttendanceController.update);
router.delete('/atendimentos/:id', /*auth, */AttendanceController.delete);

module.exports = router;