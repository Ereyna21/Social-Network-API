// Importing the 'Router' module from 'express'
const router = require('express').Router();

// Importing the 'apiRoutes' module for handling API routes
const apiRoutes = require('./api');

// Using the 'apiRoutes' for paths starting with '/api'
router.use('/api', apiRoutes);

// Middleware to handle requests for routes not defined
router.use((req, res) => {
  return res.send('Wrong route!'); // Sending a response for routes not matched
});

// Exporting the router to make the defined routes available for use in the application
module.exports = router;