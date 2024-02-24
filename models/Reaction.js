// Importing the 'Schema' and 'Types' properties from the 'mongoose' module
const { Schema, Types } = require('mongoose');

// Defining the schema for the 'Reaction' subdocument
const reaction = new Schema(
  {
    // Define the fields for the reaction schema
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generating a default ObjectId for the reactionId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Additional schema settings
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Exporting the 'reaction' schema to be used as a subdocument in the 'Thoughts' model
module.exports = reaction;