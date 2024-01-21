const AttendanceSchema = require('../../models/attendance_schema');

module.exports = class AttendanceService {
  create(data) {
    try {
      const attendance = new AttendanceSchema(data);
      return attendance.save();
    } catch (error) {
      throw new Error(`Error creating attendance: ${error}`);
    }
  }

  read() {
    try {
      return AttendanceSchema.find();
    } catch (error) {
      throw new Error(`Error reading attendances: ${error}`);
    }
  }

  readOne(id) {
    try {
      return AttendanceSchema.findById(id);
    } catch (error) {
      throw new Error(`Error reading attendance: ${error}`);
    }
  }

  update(id, data) {
    try {
      return AttendanceSchema.findByIdAndUpdate(id, data);
    } catch (error) {
      throw new Error(`Error updating attendance: ${error}`);
    }
  }

  delete(id) {
    try {
      return AttendanceSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting attendance: ${error}`);
    }
  }
};