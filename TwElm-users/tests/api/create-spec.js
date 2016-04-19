var request = require('supertest');

var srcDir = '../../src/';

describe('Create user', function() {
  var app, user;

  beforeEach(function () {
    app = require(srcDir + 'app.js');

    user = {
      username: "viniciusffj",
      name: "Vinícius Fernandes",
      password: "123abc"
    };
  });

  afterEach(function () {
    app.close();
  });

  describe('success', function () {

    it('should return success', function (done) {
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

  describe('failure', function () {

    it('should validade body', function (done) {
      delete user.name;

      var expectedResponse = {
        message: 'Invalid user'
      };

      request(app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, expectedResponse, done);
    });

    it('should now allow duplicated username', function (done) {
      user = {
        name: 'El tobi',
        username: 'tobielm',
        password: 'differentone'
      }

      var expectedResponse = {
        message: 'Username already exists'
      };

      request(app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409, expectedResponse, done);
    });

  });

});
