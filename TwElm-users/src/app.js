var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var userValidator = require('./validation/user');
var userData = require('./db/user');

var port = 8000;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/twitta';

var mongoConfig = {
  mongoClient: MongoClient,
  url: url
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/users', function (req, res) {
  var user = req.body;

  userValidator.validate(user, function () {
      userData.createUser(mongoConfig, user, function (user) {
          res.json({
            name: user.name,
            username: user.username
          });
        }, function () {
          res.status(500).json({ message: "Error creating user" });
        });
    }, function () {
      res.status(400).json({ message: "Invalid user" });
    });

});

app = app.listen(port, function () {
  console.log('App running on port', port);
});

module.exports = app;
