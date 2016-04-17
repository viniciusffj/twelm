var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/users', function (req, res) {
  var user = req.body;

  // validate
  // save db

  delete user.password;

  res.json(user);
});

app = app.listen(port, function () {
  console.log('App running on port', port);
});

module.exports = app;
