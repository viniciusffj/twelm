var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var userValidator = require('./validation/user');
var userData = require('./db/user');

var port = 8000;

var mongoConfig = require('./db/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function validateUser(req, res, next) {
  var user = req.body;

  userValidator.validate(user, function () {
    req.user = user;
    next();
  }, function (err) {
    res.status(400).json({ message: "Invalid user" });
  });
}

function saveUser(req, res, next) {
  userData.createUser(mongoConfig, req.user, function (user) {
    res.json({
      name: user.name,
      username: user.username
    });
  }, function (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "Username already exists" });
    } else {
      res.status(500).json({ message: "Error creating user" });
    }
  });
}

app.post('/users', [validateUser, saveUser]);

app.get('/users/:username', function (req, res) {
  var username = req.params.username;

  userData.getUser(mongoConfig, username, function (user) {
      res.json({
        name: user.name,
        username: user.username
      });
    }, function () {
      res.status(404).json({ message: "User doesnt exist" });
    });

});

app = app.listen(port, function () {
  console.log('App running on port', port);
});

module.exports = app;
