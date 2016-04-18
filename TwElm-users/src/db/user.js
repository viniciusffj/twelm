var userData = (function () {
  var _ = require('lodash');

  function insertUser(user, db, onError, onSuccess) {
    db.collection('users')
      .insertOne(user, function(err, result) {
        if (_.isNil(err)) {
          onSuccess(user);
        } else {
          onError(err);
        }
      });
  }

  function createUser(config, user, onSuccess, onError) {

    if (!_.isNil(config)) {
      var mongoClient = config.mongoClient;

      mongoClient.connect(config.url, function(err, db) {
        if (_.isNil(err)) {
          insertUser(user, db, onError, onSuccess);
        } else {
          onError(err);
        }
      });

    } else {
      onError();
    }

  }

  return {
    createUser: createUser
  };
})();

module.exports = userData;
