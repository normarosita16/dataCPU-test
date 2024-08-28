const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define Schema
const DataSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  namacpu: { type: String, required: true },
  tipe: { type: String, required: true },
  platform: { type: String, required: true },
  rilis: { type: String, required: true },
  ramSisa: { type: Number, required: true },
  ramTotal: { type: Number, required: true }
}, {
  timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' },
  collection: 'data',
});

// Pre-save hook for beforeCreate equivalent
DataSchema.pre('save', function(next) {
  if (this.isNew) {
    this.id = uuidv4();
  }
  next();
});

// Exporting the model
const Datas = mongoose.model('Datas', DataSchema);

module.exports = Datas;
