module.exports = function(grunt) {

  require('ft-build')('browser', grunt, {
    name: 'inline-confirm',
    port: '8001'
  });

};
