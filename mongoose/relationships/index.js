'use strict';

var async = require('async');
var _ = require('lodash');

var connectionManager = require('./lib/connectionManager');

var userService = require('./lib/userService');
var postService = require('./lib/postService');

function connectToMongo(callback) {
  connectionManager.connect(function() {
    console.log('connected');
    // When the connection is established, execute application processing
    callback();
  });
}

function removeAllUsers(callback) {
  userService.removeAllUsers(function(err) {
    callback(err);
  });
}

function removeAllPosts(callback) {
  postService.removeAllPosts(function(err) {
    callback(err);
  });
}

function checkUsers(callback) {
  console.log('>> checkUsers');
  userService.getUsers(function(err, users) {
    console.log('>> users = ' + JSON.stringify(users, null, 2));
    callback();
  });
}

function checkPosts(callback) {
  postService.getPosts(function(err, posts) {
    console.log('>> posts = ' + JSON.stringify(posts, null, 2));
    callback();
  });
}

function checkUserPosts(callback) {
  userService.getUser('templth', function(err, user) {
    console.log('>> username = ' + user.username);
    console.log('>> posts = ' + JSON.stringify(user.posts, null, 2));
    callback();
  });
}

function addUser(callback) {
  console.log('>> addUser');
  var newUser = {
    username: 'templth',
    password: 'test',
    posts: []
  };
  userService.addUser(newUser, function(err, addedUser) {
    callback(err, addedUser);
  });
}

function addPostsToUser(addedUser, callback) {
  console.log('>> addPostsToUser');
  var newPosts = [
    {
      message: 'hello1',
      _user: addedUser._id
    },
    {
      message: 'hello2',
      _user: addedUser._id
    },
    {
      message: 'hello3',
      _user: addedUser._id
    }
  ];

  var tasks = [];
  _.forEach(newPosts, function(newPost) {
    tasks.push(function(cb) {
      postService.addPost(newPost, function(err, addedPost) {
        console.log('  >> added');
        cb(err);
      });
    });
  });

  async.series(tasks, function(err) {
    callback();
  });
}

// Define the difference tasks to execute sequentially
async.waterfall([
  // Connection to mongodb
  connectToMongo,

  // Remove all users
  removeAllUsers,

  // Remove all users
  removeAllPosts,

  // Check users in the database
  checkUsers,

  // Add a new user
  addUser,

  // Add a post to the user
  addPostsToUser,

  // Check users in the database
  checkUsers,

  // Check posts in the database
  checkPosts,

  // Check user posts in the database
  checkUserPosts
], function() {
  // Disconnect cleanly from the database
  connectionManager.disconnect(function() {
    console.log('disconnected');
  });
});