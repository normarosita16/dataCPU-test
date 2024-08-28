'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../configs/database.js'))[env];
const db = {};

const applySearchQuery = require('../helpers/utilities/applySearchQuery');
const applySortQuery = require('../helpers/utilities/applySortQuery');

// Koneksi ke MongoDB
mongoose.connect(config.mongodb.url, config.mongodb.options)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Membaca semua file model dan mengimpornya ke `db`
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(mongoose);
    db[model.modelName] = model;
  });

// Export mongoose dan db models
db.mongoose = mongoose;

module.exports = db;
