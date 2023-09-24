'use strict';

// Importing necessary modules
const express = require('express');
const colors = require('colors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

// Importing database connection functions
const { connectToDatabase, closeDatabase } = require('./configs/db');

// Importing profile routes
const { profileRouter } = require('./routes/profile');

// Importing homepage controller
const { staticPageController } = require('./controllers/HomePageController');

// Set view engine to EJS
app.set('view engine', 'ejs');

// Parse JSON requests
app.use(express.json());

// Define routes
app.get('/*', staticPageController);
app.use('/profile', profileRouter);

// Start server and connect to database
(async () => {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(colors.blue('Express started. Listening on', port));
    });
  } catch (error) {
    console.error(colors.red(`Error in Server or Database: ${error.message}`));
  }
})();

// Terminate database connection on SIGINT (Ctrl+C)
process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});
