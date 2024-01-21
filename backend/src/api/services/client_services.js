const ClientSchema = require('../../models/client_schema');

module.exports = class ClientServices {
  create(data) {
    try {
      const client = new ClientSchema(data);
      return client.save();
    } catch (error) {
      throw new Error(`Error creating client: ${error}`);
    }
  }

  read() {
    try {
      return ClientSchema.find();
    } catch (error) {
      throw new Error(`Error reading clients: ${error}`);
    }
  }

  readOne(id) {
    try {
      return ClientSchema.findById(id);
    } catch (error) {
      throw new Error(`Error reading client: ${error}`);
    }
  }

  update(id, data) {
    try {
      return ClientSchema.findByIdAndUpdate(id, data);
    } catch (error) {
      throw new Error(`Error updating client: ${error}`);
    }
  }

  delete(id) {
    try {
      return ClientSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting client: ${error}`);
    }
  }
};