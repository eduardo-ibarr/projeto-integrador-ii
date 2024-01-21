const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    phoneNumber: { type: Number, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    address: { type: String, required: true },
    services: [
      { type: String, required: true },
    ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
  }
);

const model = mongoose.model('Clientes', clientSchema);

module.exports = model;