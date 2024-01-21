const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false }
  }
);

const model = mongoose.model('Serviços', workSchema);

module.exports = model;