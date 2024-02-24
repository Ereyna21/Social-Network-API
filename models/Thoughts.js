// Importing the 'Schema' and 'model' properties from the 'mongoose' module
const { Schema, model } = require('mongoose');

// Importing the 'Reaction' model
const Reaction = require('./Reaction');

// Defining the schema for the 'Thoughts' model
const thoughtsSchema = new Schema(
  {
    // Define the fields for the thoughts schema
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughtsText: {
      type: String,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction], // Embedding the 'Reaction' schema within the 'Thoughts' schema
  },
  {
    // Additional schema settings
    toJSON: {
      virtuals: true,
    },
  }
);

// Creating a virtual field 'getReactions' to get the number of reactions for a thought
thoughtsSchema.virtual('getReactions').get(function () {
  return this.reactions.length;
});

// Creating the 'Thoughts' model using the defined schema
const Thoughts = model('thoughts', thoughtsSchema);

// Exporting the 'Thoughts' model to make it available for use in other parts of the application
module.exports = Thoughts;