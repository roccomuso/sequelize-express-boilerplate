
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config    = require('config');
var debug = require('../lib/debug')();
var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
var db        = {};


// caching layer
debug('Initializing cache layer using memcached...');
var Memcached = require('memcached');
var initCache = require('sequelize-cacher');
var cacheEngine = new Memcached(config.memcached.host+':'+config.memcached.port);
cacheEngine.on('failure', function( details ){ console.error( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ); });
cacheEngine.on('reconnecting', function( details ){ console.error( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms");});
var cacher = initCache(sequelize, cacheEngine);


// Export all models in the current directory
debug('Exporting models...');

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// attach cache wrapper
Object.keys(db).forEach(function(modelName){
  debug('Cached Model:', modelName);
  db[modelName] = cacher(modelName).ttl(config.memcached.ttl);
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
