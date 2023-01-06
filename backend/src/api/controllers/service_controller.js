const createService = require('../services/services/create');
const readService = require('../services/services/read');
const readOneService = require('../services/services/read_one');
const updateService = require('../services/services/update');
const deleteService = require('../services/services/delete');

class Service {
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

module.exports = new Service;