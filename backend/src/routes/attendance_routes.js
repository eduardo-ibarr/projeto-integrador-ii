const router = require('express').Router();

const AttendanceController = require('../controllers/attendance_controller');
const AttendanceServices = require('../services/attendance_services');

const attendanceServices = new AttendanceServices();
const attendanceController = new AttendanceController(attendanceServices);

router.get('/attendances', attendanceController.list);
router.get('/attendances/:id', attendanceController.show);
router.post('/attendances', attendanceController.store);
router.put('/attendances/:id', attendanceController.update);
router.patch('/attendances/:id', attendanceController.update);
router.delete('/attendances/:id', attendanceController.delete);

module.exports = router;