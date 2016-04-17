var assert = require('chai').assert;

var srcDir = '../../../src/';
var helpersDir = '../../helpers/';

var helper = require(helpersDir + 'validation');

describe('Validate user', function () {
  var userValidator, user;

  beforeEach(function () {
    user = {
      name: "Ronaldinho Gaucho",
      username: "showmanr10",
      password: "Barcelona&Milan"
    };

    userValidator = require(srcDir + 'validation/user');
  });

  describe('missing fields', function () {

    function validateMissing(user, field, done) {
      return function (err) {
        delete user[field];
        userValidator.validate(user, assert.fail, helper.assertRequired(field, done));
      };
    }

    function validateMissingAndEmpty(user, field, done) {
      user[field] = '';

      var callback = helper.assertEmpty(field, validateMissing(user, field, done));

      userValidator.validate(user, assert.fail, callback);
    }

    it('should throw when missing username', function (done) {
      validateMissingAndEmpty(user, 'username', done);
    });

    it('should throw when missing name', function (done) {
      validateMissingAndEmpty(user, 'name', done);
    });

    it('should throw when missing password', function (done) {
      validateMissingAndEmpty(user, 'password', done);
    });

  });

  describe('no missing fields', function () {

    it('should throw when username is not alphanumeric', function (done) {
      user.username = 'r@10';

      userValidator.validate(user, assert.fail, helper.assertAlphaNum('username', done));
    });

  });

});
