'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our user schema
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('User', userSchema);