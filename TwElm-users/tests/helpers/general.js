
var helpers = (function () {

  function doneWrapper(done) {
    return function () {
      done();
    }
  }

  return {
    doneWrapper: doneWrapper
  };

})();

module.exports = helpers;
