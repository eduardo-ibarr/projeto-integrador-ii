const router = require('express').Router();

const AttendanceController = require('../controllers/attendance_controller');
const AttendanceServices = require('../services/attendance_services');

const attendanceServices = new AttendanceServices();
const attendanceController = new AttendanceController(attendanceServices);

router.get('/attendances', attendanceController.list.bind(attendanceController));
router.get('/attendances/:id', attendanceController.show.bind(attendanceController));
router.post('/attendances', attendanceController.store.bind(attendanceController));
router.put('/attendances/:id', attendanceController.update.bind(attendanceController));
router.patch('/attendances/:id', attendanceController.update.bind(attendanceController));
router.delete('/attendances/:id', attendanceController.delete.bind(attendanceController));

module.exports = router;