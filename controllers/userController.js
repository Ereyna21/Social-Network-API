// Importing the 'User' model from the '../models/User' directory
const User = require('../models/User');

// Exporting an object with various asynchronous functions to handle different CRUD operations related to users
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by ID with populated thoughts and friends
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.status(200).json('Successful update');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndRemove({ _id: req.params.userId });
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a friend relationship between two users
  async createFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json('You made a friend!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a friend relationship between two users
  async deleteFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json({ message: 'They were toxic!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};