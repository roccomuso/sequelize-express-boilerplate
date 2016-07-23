require('./lib/env-mapping.js');
var config = require('config');
var chalk = require('chalk');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan-debug');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var app = express();

console.log(chalk.yellow.bgBlack('Running on NODE_ENV:', app.get('env')));
console.log(require('./lib/figlet.js')); // logo


// view engine setup
app.engine('html', cons.handlebars);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger(config.namespace+':rest', 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
