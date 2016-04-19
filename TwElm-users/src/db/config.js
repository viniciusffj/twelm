var config = (function () {
  var fs = require('fs');
  var MongoClient = require('mongodb').MongoClient;

  var file = fs.readFileSync('config/mongo.local.json', {'encoding': 'UTF8'});
  var config = JSON.parse(file).mongoAppDb;

  return {
    mongoClient: MongoClient,
    url: 'mongodb://' + config.host + ':' + config.port + '/' + config.db
  };

})();

module.exports = config;
