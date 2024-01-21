const createService = require('../services/attendance/create');
const readService = require('../services/attendance/read');
const readOneService = require('../services/attendance/read_one');
const updateService = require('../services/attendance/update');
const deleteService = require('../services/attendance/delete');

class Attendance {
  create(req, res) {
    createService(req, res);
  }

  read(req, res) {
    readService(req, res);
  }

  readOne(req, res) {
    readOneService(req, res);
  }

  update(req, res) {
    updateService(req, res);
  }

  delete(req, res) {
    deleteService(req, res);
  }
}

module.exports = new Attendance;