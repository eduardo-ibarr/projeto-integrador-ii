module.exports = class ClientController {
  clientServices;

  constructor(clientServices) {
    this.clientServices = clientServices;
  }

  async verifyBody(req, res, callback) {
    const {
      _id,
      name,
      isActive,
      phoneNumber,
      cpf,
      rg,
      address,
      services,
      createdAt,
      updatedAt
    } = req.body;

    const data = {
      _id,
      name,
      isActive,
      phoneNumber,
      cpf,
      rg,
      address,
      services,
      createdAt,
      updatedAt
    };

    const isMissingData = Object.values(data).some(value => value === undefined);

    if (isMissingData) {
      return res.status(400).send({
        message: 'Missing data.'
      });
    }

    await callback(data);
  }

  async store(req, res) {
    this.verifyBody(req, res, async (data) => {
      try {
        await this.clientServices.create(data);

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

  async list(req, res) {
    try {
      const clients = await this.clientServices.read();

      return res.status(200).send(clients);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading clients.'
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const client = await this.clientServices.readOne(id);

      return res.status(200).send(client);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading client.'
      });
    }
  }

  async update(req, res) {
    await this.verifyBody(req, res, async (data) => {
      try {
        await this.clientServices.update(req.params.id, data);

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

  async delete(req, res) {
    try {
      await this.clientServices.delete(req.params.id);

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