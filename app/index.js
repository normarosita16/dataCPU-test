require('dotenv').config();
const { MongoClient } = require('mongodb');
const service = require('./configs/express');
const port = process.env.SERVICE_PORT;
global.__basedir = __dirname + '/..';

async function init() {
  service.start({ port });

  try {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
    });

    await client.connect();
    console.log('Connected to MongoDB');

    // Optionally, you can access the database and collections here:
    const db = client.db(process.env.DB_NAME);
    // For example:
    // const collection = db.collection('your-collection-name');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

init();
