const router = require('express').Router();
//const auth = require('../api/auth/verify_jwt');

const AttendanceController = require('../api/controllers/attendance_controller');
const AttendanceServices = require('../api/services/attendance_services');

const attendanceServices = new AttendanceServices();
const attendanceController = new AttendanceController(attendanceServices);

router.get('/attendances', /*auth, */attendanceController.list);
router.get('/attendances/:id', /*auth, */attendanceController.show);
router.post('/attendances', /*auth, */attendanceController.store);
router.put('/attendances/:id', /*auth, */attendanceController.update);
router.patch('/attendances/:id', /*auth, */attendanceController.update);
router.delete('/attendances/:id', /*auth, */attendanceController.delete);

module.exports = router;