'use strict';

var Post = require('./post');

var exports = module.exports;

exports.addPost = function(post, callback) {
  var mPost = new Post(post);
  mPost.save(function(err) {
  	console.log(err);
  	callback(err);
  });
};

// Create endpoint /api/users for GET
exports.getPosts = function(callback) {
  Post.find().populate('_user').exec(callback);
};

exports.getPost = function(id, callback) {
  Post.findOne({ _id: id }).exec(callback);
};

exports.updatePost = function(post, callback) {
  Post.findOneAndUpdate(
    {_id: post._id},
    post,
    {upsert: true},
    callback);
};

exports.removePost = function(id, callback) {
  Post.findOneAndRemove(
    { _id: id },
    callback);
};

exports.removeAllPosts = function(callback) {
  Post.remove(
    { },
    callback);
};