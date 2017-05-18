const Promise = require('bluebird');

Promise.config({
  warnings: {
    wForgottenReturn: false,
  },
});

module.exports = Promise;
