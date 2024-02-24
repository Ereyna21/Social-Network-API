// Importing the 'Router' module from 'express'
const router = require('express').Router();

// Importing controller functions from the 'thoughtsController' file
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// Routes for handling thought-related operations

// Route for handling GET and POST requests to '/api/thoughts'
router.route('/').get(getThoughts).post(createThoughts);

// Route for handling GET, PUT, and DELETE requests to '/api/thoughts/:thoughtsId'
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

// Route for handling POST requests to '/api/thoughts/:thoughtsId/reactions'
router.route('/:thoughtsId/reactions').post(createReaction);

// Route for handling DELETE requests to '/api/thoughts/:thoughtsId/reactions/:reactionId'
router.route('/:thoughtsId/reactions/:reactionId').delete(deleteReaction);

// Exporting the router to make the defined routes available for use in the application
module.exports = router;