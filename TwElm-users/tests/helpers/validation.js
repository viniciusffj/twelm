var helpers = (function () {
  var assert = require('chai').assert;

  function assertRequired(field, done) {
    return function (err) {
      assert.equal(err.details[0].message, '"' + field + '" is required');
      done();
    };
  };

  return {
    assertRequired: assertRequired
  };
  
})();

module.exports = helpers;
