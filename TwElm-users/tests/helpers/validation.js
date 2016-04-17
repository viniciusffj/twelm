var helpers = (function () {
  var assert = require('chai').assert;

  function assertRequired(field, done) {
    return function (err) {
      assert.equal(err.details[0].message, '"' + field + '" is required');
      done();
    };
  };

  function assertEmpty(field, done) {
    return function (err) {
      assert.equal(err.details[0].message, '"' + field + '" is not allowed to be empty');
      done();
    };
  };

  function assertAlphaNum(field, done) {
    return function (err) {
      assert.equal(err.details[0].message, '"' + field + '" must only contain alpha-numeric characters');
      done();
    };
  };

  return {
    assertRequired: assertRequired,
    assertEmpty: assertEmpty,
    assertAlphaNum: assertAlphaNum
  };

})();

module.exports = helpers;
