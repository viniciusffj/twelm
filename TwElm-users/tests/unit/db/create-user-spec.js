var assert = require('chai').assert;

var srcDir = '../../../src/';
var helpersDir = '../../helpers/';

var mongoHelper = require(helpersDir + 'mongo');
var helper = require(helpersDir + 'general');

describe('User data when creating an user', function () {
  var createUser, user, config, doneWrapper;

  beforeEach(function () {
    doneWrapper = helper.doneWrapper;
    createUser = require(srcDir + 'db/user').createUser;
    user = {
      name: "Otavio Martins",
      username: "otaviomartins",
      password: "123otavio321"
    };
    config = {
      url: 'testurl'
    };
  });

  it('should throw if config is missing', function (done) {
    createUser(null, user, assert.fail, done);
  });

  it('should call success', function (done) {
    config.mongoClient = mongoHelper.successfulClient;
    createUser(config, user, doneWrapper(done), assert.fail);
  });

  it('should throw if cannot connect on database', function (done) {
    config.mongoClient = mongoHelper.notConnectedClient;
    createUser(config, user, assert.fail, doneWrapper(done));
  });

  it('should throw if cannot insert user', function (done) {
    config.mongoClient = mongoHelper.notInsertedClient;
    createUser(config, user, assert.fail, doneWrapper(done));
  });

  it('should throw if cannot close db connection', function (done) {
    config.mongoClient = mongoHelper.cannotCloseClient;
    createUser(config, user, assert.fail, doneWrapper(done));
  });

});
