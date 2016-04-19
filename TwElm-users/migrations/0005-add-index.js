
var mongodb = require('mongodb');

exports.up = function(db, next){
  var users = db.collection('users');
  users.createIndex({username: 1}, { unique: true }, next);
};

exports.down = function(db, next){
    next();
};
