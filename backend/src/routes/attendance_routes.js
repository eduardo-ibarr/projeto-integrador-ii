const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const AttendanceController = require('../api/controllers/attendance_controller');

router.get('/attendances', /*auth, */AttendanceController.read);
router.get('/attendances/:id', /*auth, */AttendanceController.readOne);
router.post('/attendances', /*auth, */AttendanceController.create);
router.put('/attendances/:id', /*auth, */AttendanceController.update);
router.patch('/attendances/:id', /*auth, */AttendanceController.update);
router.delete('/attendances/:id', /*auth, */AttendanceController.delete);

module.exports = router;