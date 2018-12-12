// Dependencies
const mongoose = require('mongoose');
const mongo_config = require('./mongo_config.js');

const username = mongo_config.username;
const password = mongo_config.password;

const db = "mongodb://"+username+":"+password+"@ds125273.mlab.com:25273/harry-test"

// connect to mongodb
mongoose.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
});

// User model (This is used as plural for the collection, so this works with the "Users" collection)
var User = require('./mongoose/models/user');

// create a new user called Harry
var NewUser = new User({
    firstName: 'Harry',
    lastName: 'Jacks',
    username: 'hjacks',
    password: '12345'
});

// call the built-in save method to save to the database
NewUser.save((err) => {
    if (err) {
        console.log(err.errmsg);
    } else {
        console.log('User saved successfully!');
    }
});

// Get all Users from Users collection
User.find({},(err, users) => {
    if (err) {
        console.log(err.errmsg);
    } else {
        console.log(users);
    }
});

// Get one User from Users collection
User.find({ username: "hjacks" },(err, users) => {
    if (err) {
        console.log(err.errmsg);
    } else {
        console.log(users);
    }
});

// Update a specific user
User.findOneAndUpdate({ username: "hjacks" }, { admin: true }, (err, user) => {
    if (err) {
        console.log(err.errmsg);
    } else {
        console.log(user);
    }
});

// Delete a user
User.findOneAndRemove({ username: 'Bill' }, function(err) {
    if (err) {
        console.log(err.errmsg);
    } else {
        console.log('User deleted!');
    }
});