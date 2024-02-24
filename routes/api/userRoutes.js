// Importing the 'Router' module from 'express'
const router = require('express').Router();

// Importing controller functions from the 'userController' file
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/userController');

// Routes for handling user-related operations

// Route for handling GET and POST requests to '/api/users'
router.route('/').get(getUsers).post(createUser);

// Route for handling GET, PUT, and DELETE requests to '/api/users/:userId'
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Route for handling POST and DELETE requests to '/api/users/:userId/friends/:friendId'
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

// Exporting the router to make the defined routes available for use in the application
module.exports = router;