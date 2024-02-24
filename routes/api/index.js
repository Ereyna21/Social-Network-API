// Importing the 'Router' module from 'express'
const router = require('express').Router();

// Importing the routes for thoughts and users
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');

// Middleware to handle routes related to thoughts and users

// Using the 'thoughtsRoutes' for paths starting with '/api/thoughts'
router.use('/thoughts', thoughtsRoutes);

// Using the 'userRoutes' for paths starting with '/api/user'
router.use('/user', userRoutes);

// Exporting the router to make the defined routes available for use in the application
module.exports = router;