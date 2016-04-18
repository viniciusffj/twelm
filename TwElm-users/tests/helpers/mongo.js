var mongoHelper = (function () {

  var successfulClient = {
    connect: function (url, cb) {
      var db = {
        collection: function () {
          return {
            insertOne: function (user, cb) {
              cb(null, {});
            }
          };
        }
      };
      cb(null, db);
    }
  };

  var notConnectedClient = {
    connect: function (url, cb) {
      cb({}, null);
    }
  };

  var notInsertedClient = {
    connect: function (url, cb) {
      var db = {
        collection: function () {
          return {
            insertOne: function (user, cb) {
              cb({}, null);
            }
          };
        }
      };
      cb(null, db);
    }
  };

  return {
    successfulClient: successfulClient,
    notInsertedClient: notInsertedClient,
    notConnectedClient: notConnectedClient
  }
})();

module.exports = mongoHelper;
