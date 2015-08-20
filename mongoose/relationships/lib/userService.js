'use strict';

var User = require('./user');

var exports = module.exports;

exports.addUser = function(user, callback) {
  var mUser = new User(user);
  mUser.save(callback);
};

// Create endpoint /api/users for GET
exports.getUsers = function(callback) {
  User.find().populate('posts').exec(callback);
};

exports.getUser = function(username, callback) {
  User.findOne({ username: username })
      .populate('posts').exec(callback);
};

exports.updateUser = function(user, callback) {
  User.findOneAndUpdate(
    { _id: user._id },
    user,
    { upsert: true },
    callback);
};

exports.removeUser = function(username, callback) {
  User.findOneAndRemove(
    { username: username },
    callback);
};

exports.removeAllUsers = function(callback) {
  User.remove(
    { },
    callback);
};