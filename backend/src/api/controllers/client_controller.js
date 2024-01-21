module.exports = class ClientController {
  clientServices;

  constructor(clientServices) {
    this.clientServices = clientServices;
  }

  verifyBody(req, res, callback) {
    const {
      _id,
      createdAt,
      description,
      isActive,
      name,
      price
    } = req.body;

    const data = {
      _id,
      createdAt,
      description,
      isActive,
      name,
      price
    };

    const isMissingData = Object.values(data).some(value => value === undefined);

    if (isMissingData) {
      return res.status(400).send({
        message: 'Missing data.'
      });
    }

    return callback(data);
  }

  store(req, res) {
    this.verifyBody(req, res, (data) => {
      try {
        this.clientServices.create(data);

        return res.status(201).send({
          message: 'Client created successfully.'
        });
      } catch (error) {
        return res.status(500).send({
          message: 'Error creating client.'
        });
      }
    });
  }

  list(req, res) {
    try {
      const clients = this.clientServices.read();

      return res.status(200).send(clients);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading clients.'
      });
    }
  }

  show(req, res) {
    const { id } = req.params;

    try {
      const client = this.clientServices.readOne(id);

      return res.status(200).send(client);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading client.'
      });
    }
  }

  update(req, res) {
    this.verifyBody(req, res, (data) => {
      try {
        this.clientServices.update(req.params.id, data);

        return res.status(200).send({
          message: 'Client updated successfully.'
        });
      } catch (error) {
        return res.status(500).send({
          message: 'Error updating client.'
        });
      }
    });
  }

  delete(req, res) {
    try {
      this.clientServices.delete(req.params.id);

      return res.status(200).send({
        message: 'Client deleted successfully.'
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error deleting client.'
      });
    }
  }
};