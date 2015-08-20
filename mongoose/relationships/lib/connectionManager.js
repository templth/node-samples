'use strict';

var mongoose = require('mongoose');

// Connect to mongodb
var connect = function() {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/chat-room-dev', options);
};

// mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);

module.exports = {
  connect: function(callback) {
    mongoose.connection.on('connected', function(ref) {
      callback();
    });

	connect();
  },

  disconnect: function(callback) {
    mongoose.disconnect(callback);
  }
};