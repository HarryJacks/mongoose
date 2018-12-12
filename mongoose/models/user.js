// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  meta: {
    age: Number
  },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  let currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

// Create model using the schema
var User = mongoose.model('User', userSchema);

// export User
module.exports = User;