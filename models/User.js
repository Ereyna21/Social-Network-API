// Importing the 'Schema' and 'model' properties from the 'mongoose' module
const { Schema, model } = require('mongoose');

// Defining the schema for the 'User' model
const userSchema = new Schema(
  {
    // Define the fields for the user schema
    username: String,
    email: String,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    // Additional schema settings
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Creating a virtual field 'friendCount' to get the number of friends for a user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Creating the 'User' model using the defined schema
const User = model('user', userSchema);

// Exporting the 'User' model to make it available for use in other parts of the application
module.exports = User;