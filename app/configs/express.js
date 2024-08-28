const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const helmet = require('helmet');
const mongoose = require('mongoose'); // Menambahkan Mongoose

const dataCPURoute = require('../routes/data_cpu_route');

exports.start = (config) => {

  const app = express();

  app.use(helmet());

  app.use(cors());

  // Menggunakan HTTP verbs seperti PUT atau DELETE
  app.use(methodOverride());

  // Parsing body params dan melampirkannya ke req.body
  app.use(bodyParser.json({ limit: '100mb' }));

  // Parsing data post dengan application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({limit: '100mb', parameterLimit: 100000, extended: true}));

  // CORS Headers
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  // Middleware untuk mengatur Timing-Allow-Origin
  app.use(function(req, res, next) {
    res.setHeader('Timing-Allow-Origin', '*');
    next();
  });

  app.get(`/`, function (req, res) {
    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'berhasil masuk',
    });
  });

  // Define routes
  app.use('/data', dataCPURoute);

  // Menghubungkan ke MongoDB menggunakan Mongoose
  mongoose.connect('mongodb://127.0.0.1:27017/dataCPU', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // user: process.env.DB_USER,
    // pass: process.env.DB_PASS,
    // dbName: process.env.DB_NAME,
  })
    .then(() => {
      console.log('MongoDB connected successfully');
      // Memulai server setelah koneksi berhasil
      app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};
