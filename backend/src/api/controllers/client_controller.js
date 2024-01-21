const createService = require('../services/clients/create');
const readService = require('../services/clients/read');
const readOneService = require('../services/clients/read_one');
const updateService = require('../services/clients/update');
const deleteService = require('../services/clients/delete');

class Client {
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

module.exports = new Client;