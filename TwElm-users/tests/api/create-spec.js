var assert = require('chai').assert;
var request = require('supertest');

var srcDir = '../../src/';

describe('Create user', function() {
  var app;

  beforeEach(function () {
    app = require(srcDir + 'app.js');
  });

  afterEach(function () {
    app.close();
  });

  describe('success', function () {

    it('should return success', function (done) {
      var user = {
        username: "viniciusffj",
        name: "Vinícius Fernandes",
        password: "123abc"
      };

      var expectedResponse = {
        username: "viniciusffj",
        name: "Vinícius Fernandes"
      };

      request(app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expectedResponse, done);
    });

  });

});
