
var mongodb = require('mongodb');

exports.up = function (db, next) {
  var users = db.collection('users');
  users.insert({name: 'tobi', username: 'tobielm', password: '123abc321'}, next);
};

exports.down = function (db, next) {
  db.collection('users').drop(next);
};
