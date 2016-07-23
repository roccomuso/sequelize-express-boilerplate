var debug = require('../lib/debug')();
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.User.create({
    username: req.body.username
  }).then(function() {
    debug('User created');
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    debug('User destroyed');
    res.redirect('/');
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function() {
    debug('Task created');
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    debug('Task destroyed');
    res.redirect('/');
  });
});


module.exports = router;
