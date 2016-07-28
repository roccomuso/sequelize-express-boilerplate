var debug = require('../lib/debug')();
var models  = require('../models');
var express = require('express');
var router  = express.Router();

// models.<cachedModel>.model   <-- original Sequelize Model
// models.<cachedModel>         <-- cached Sequelize Model

router.post('/create', function(req, res) {
  models.User.model.create({
    username: req.body.username
  }).then(function() {
    debug('User created');
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.model.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    debug('User destroyed');
    res.redirect('/');
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.model.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function() {
    debug('Task created');
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.model.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    debug('Task destroyed');
    res.redirect('/');
  });
});


module.exports = router;
