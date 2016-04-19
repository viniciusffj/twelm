var request = require('supertest');

var srcDir = '../../src/';

describe('Get user', function() {
  var app, username;

  beforeEach(function () {
    app = require(srcDir + 'app.js');
    username = 'tobielm';
  });

  afterEach(function () {
    app.close();
  });

  it('should return user if exists', function (done) {
    var expectedResponse = {
      username: "tobielm",
      name: "tobi"
    };

    request(app)
      .get('/users/' + username)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expectedResponse, done);
  });

  it('should return error if doesnt exist', function (done) {
    var expectedResponse = {
      message: 'User doesnt exist'
    };

    request(app)
      .get('/users/xptoxpto')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, expectedResponse, done);
  });

});
