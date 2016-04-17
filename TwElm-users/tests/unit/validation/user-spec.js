var assert = require('chai').assert;

var srcDir = '../../../src/';
var helpersDir = '../../helpers/';

var helper = require(helpersDir + 'validation');

describe('Validate user', function () {
  var userValidator, user;

  describe('missing fields', function () {

    beforeEach(function () {
      user = {
        name: "Ronaldinho Gaucho",
        username: "showmanr10",
        password: "Barcelona&Milan"
      };

      userValidator = require(srcDir + 'validation/user');
    });

    it('should throw error when missing username', function (done) {
      delete user.username;

      userValidator.validate(user, assert.fail, helper.assertRequired('username', done));
    });

    it('should throw error when missing name', function (done) {
      delete user.name;

      userValidator.validate(user, assert.fail, helper.assertRequired('name', done));
    });

    it('should throw error when missing password', function (done) {
      delete user.password;

      userValidator.validate(user, assert.fail, helper.assertRequired('password', done));
    });
    
  });

});
