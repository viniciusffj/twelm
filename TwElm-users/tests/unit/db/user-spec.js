var assert = require('chai').assert;

var srcDir = '../../../src/';
var helpersDir = '../../helpers/';

var mongoHelper = require(helpersDir + 'mongo');

describe('User data', function () {
  var userData, user, config;

  beforeEach(function () {
    userData = require(srcDir + 'db/user');
    user = {
      name: "Otavio Martins",
      username: "otaviomartins",
      password: "123otavio321"
    };
    config = {
      url: 'testurl'
    };
  });

  function doneWrapper(done) {
    return function () {
      done();
    }
  }

  describe('when creating a user', function () {

    it('should throw if config is missing', function (done) {
      userData.createUser(null, user, done, assert.fail);
    });

    it('should call success', function (done) {
      config.mongoClient = mongoHelper.successfulClient;
      userData.createUser(config, user, assert.fail, doneWrapper(done));
    });

    it('should throw if cannot connect on database', function (done) {
      config.mongoClient = mongoHelper.notConnectedClient;
      userData.createUser(config, user, doneWrapper(done), assert.fail);
    });

    it('should throw if cannot insert user', function (done) {
      config.mongoClient = mongoHelper.notInsertedClient;
      userData.createUser(config, user, doneWrapper(done), assert.fail);
    });

  });

});
