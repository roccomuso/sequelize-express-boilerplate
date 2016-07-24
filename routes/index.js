var debug = require('../lib/debug')();
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    debug('Users fetched');
    res.render('index', {
      partials: {body: 'body'},
      title: 'Express',
      users: users
    });
  });
});

module.exports = router;
