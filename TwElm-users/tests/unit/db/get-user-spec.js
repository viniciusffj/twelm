
var assert = require('chai').assert;

var srcDir = '../../../src/';
var helpersDir = '../../helpers/';

var mongoHelper = require(helpersDir + 'mongo');
var helper = require(helpersDir + 'general');

describe('User data when getting a single user', function () {
  var getUser, userName, config, doneWrapper;

  beforeEach(function () {
    doneWrapper = helper.doneWrapper;
    getUser = require(srcDir + 'db/user').getUser;

    username = "otaviomartins",
    config = {
      url: 'testurl'
    };

  });

  it('should throw if config is missing', function (done) {
    getUser(null, username, assert.fail, done);
  });

  it('should call success', function (done) {
    config.mongoClient = mongoHelper.successfulClient;
    getUser(config, username, doneWrapper(done), assert.fail);
  });

  it('should throw if cannot connect on database', function (done) {
    config.mongoClient = mongoHelper.notConnectedClient;
    getUser(config, username, assert.fail, doneWrapper(done));
  });

  it('should throw if cannot find user', function (done) {
    config.mongoClient = mongoHelper.notFoundClient;
    getUser(config, username, assert.fail, doneWrapper(done));
  });

  it('should throw if cannot close db connection', function (done) {
    config.mongoClient = mongoHelper.cannotCloseClient;
    getUser(config, username, assert.fail, doneWrapper(done));
  });

});
