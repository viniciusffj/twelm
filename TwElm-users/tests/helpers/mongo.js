var mongoHelper = (function () {

  var successfulFind = function () {
    return {
      limit: function () {
        return {
          next: function (cb) {
            cb(null, {});
          }
        };
      }
    };
  };

  var successfulClient = {
    connect: function (url, cb) {
      var db = {
        collection: function () {
          return {
            insertOne: function (user, cb) {
              cb(null, {});
            },
            find: successfulFind
          };
        },
        close: function (cb) {
          cb(null);
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


  var notFoundFind = function () {
    return {
      limit: function () {
        return {
          next: function (cb) {
            cb({}, null);
          }
        };
      }
    };
  };

  var notFoundClient = {
    connect: function (url, cb) {
      var db = {
        collection: function () {
          return {
            find: notFoundFind
          };
        }
      };
      cb(null, db);
    }
  };

  var cannotCloseClient = {
    connect: function (url, cb) {
      var db = {
        collection: function () {
          return {
            insertOne: function (user, cb) {
              cb(null, {});
            },
            find: successfulFind
          };
        },
        close: function (cb) {
          cb({});
        }
      };
      cb(null, db);
    }
  };

  return {
    successfulClient: successfulClient,
    notInsertedClient: notInsertedClient,
    notFoundClient: notFoundClient,
    cannotCloseClient: cannotCloseClient,
    notConnectedClient: notConnectedClient
  }
})();

module.exports = mongoHelper;
