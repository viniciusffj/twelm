var config = (function () {
  var MongoClient = require('mongodb').MongoClient;
  var _ = require('lodash');

  var mongoConfig = {
    host: process.env.MONGO_HOST || 'mongo',
    port: process.env.MONGO_PORT || 27017,
    db: process.env.MONGO_USERS_DB || 'users'
  };

  var url = _.template('mongodb://${host}:${port}/${db}')(mongoConfig);

  return {
    mongoClient: MongoClient,
    url: url
  };

})();

module.exports = config;
