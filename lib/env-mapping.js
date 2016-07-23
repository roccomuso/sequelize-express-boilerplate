/* Map environment's shortnames */

module.exports = function(){
  var mapping = {
    stg  : 'staging',
    prod : 'production',
    dev  : 'development'
  };
  var env = process.env.NODE_ENV;
  if (env && mapping[env])
    process.env.NODE_ENV = mapping[env];
};
