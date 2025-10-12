const express = require('express');
const database = require('./config/database');
const app = express();

const router = require('./app');
const PORT = process.env.PORT || 3000;

console.log('Starting server...');

database.db.sync({ force: false })
  .then(() => {
    app.use('/', router);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });