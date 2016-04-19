var userData = (function () {
  var _ = require('lodash');

  function finalOnSuccess(db, onSuccess, onError) {
    return function (doc) {
      db.close(function (err) {
        if (noErrors(err)) {
          onSuccess(doc);
        } else {
          onError(err);
        }
      });
    };
  }

  function noErrors(err) {
    return _.isNil(err);
  }

  function dbFunction(dbFn, config, arg, onSuccess, onError) {
    if (_.isNil(config)) {
      onError();
    } else {
      var mongoClient = config.mongoClient;

      mongoClient.connect(config.url, function(err, db) {
        if (noErrors(err)) {
          dbFn(arg, db, finalOnSuccess(db, onSuccess, onError), onError);
        } else {
          onError(err);
        }
      });
    }
  }

  function insertUser(user, db, onSuccess, onError) {
    db.collection('users')
      .insertOne(user, function(err, result) {
        if (noErrors(err)) {
          onSuccess(user);
        } else {
          onError(err);
        }
      });
  }

  function foundUser(err, doc) {
    return noErrors(err) && !_.isNil(doc);
  }

  function getUserFromDB(username, db, onSuccess, onError) {
    db.collection('users')
      .find({ 'username': username })
      .limit(1)
      .next(function (err, doc) {
        if (foundUser(err, doc)) {
          onSuccess(doc);
        } else {
          onError(err);
        }
      });
  }

  return {
    createUser: _.curry(dbFunction)(insertUser),
    getUser: _.curry(dbFunction)(getUserFromDB)
  };
})();

module.exports = userData;
