// Importing the 'User' model from the './User' file
const User = require('./User');

// Importing the 'Thoughts' model from the './Thoughts' file
const Thoughts = require('./Thoughts');

// Exporting an object containing the 'User' and 'Thoughts' models
module.exports = {
  User, // Exporting the 'User' model
  Thoughts, // Exporting the 'Thoughts' model
};