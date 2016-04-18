var userData = (function () {

  function insertUser(user, db, onError, onSuccess) {
    db.collection('users')
      .insertOne(user, function(err, result) {
        if (err === null) {
          onSuccess(user);
        } else {
          onError(err);
        }
      });
  }

  function createUser(config, user, onError, onSuccess) {

    if (config !== null) {
      var mongoClient = config.mongoClient;

      mongoClient.connect(config.url, function(err, db) {
        if (err === null) {
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
