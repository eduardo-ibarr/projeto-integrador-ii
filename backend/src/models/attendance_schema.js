const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    client: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    date: { type: Date, required: true },
    works: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, required: true },
        updatedAt: { type: Date, required: false }
      }
    ],
    total: { type: Number, required: true },
    totalPaid: { type: Number, required: false },
    isPaid: { type: Boolean, required: true },
    isDone: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
  }
);

const model = mongoose.model('Atendimentos', attendanceSchema);

module.exports = model;