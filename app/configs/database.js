require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL || 'mongodb://localhost:27017/dataCPU',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
      dbName: process.env.DB_NAME,
    },
    timezone: process.env.TIMEZONE || '+07:00',
  },
};
