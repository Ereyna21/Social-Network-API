// Importing the 'Thoughts' and 'User' models from the '../models' directory
const { Thoughts, User } = require('../models');

// Exporting an object with various asynchronous functions to handle different CRUD operations
module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by ID
  async getSingleThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId });
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'New thoughts created, but found no user with that ID' });
      }
      res.json('Created a thought!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a thought by ID
  async updateThoughts(req, res) {
    try {
      const updatedThoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { new: true }
      );
      if (!updatedThoughts) {
        return res.status(404).json({ message: 'No thoughts with this ID' });
      }
      res.status(200).json('Updated thought');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought by ID
  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this ID' });
      }
      res.json({ message: 'Successfully deleted thought' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!thoughts) {
        return res.status(404).json({ message: 'New reaction created, but found no thoughts with that ID' });
      }
      res.json('Created a reaction!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thoughts) {
        return res.status(404).json({ message: 'No reaction with this ID' });
      }
      res.json({ message: 'Successfully deleted reaction' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};