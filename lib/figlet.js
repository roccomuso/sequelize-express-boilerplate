var figlet = require('figlet');
var chalk = require('chalk');
var config = require('config');

figlet(config.logo, function(err, data) {
    if (err) {
        console.log('Something went wrong with the ascii-logo ...');
        console.dir(err);
        return;
    }
    console.log(chalk.green.bold(data)); // print colored logo
});

module.exports = '';
