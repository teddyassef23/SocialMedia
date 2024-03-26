const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    reactionId: {
        type: String,
        required: true,
        
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
        getters: true,
        
    },
  
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reactions',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtual: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
