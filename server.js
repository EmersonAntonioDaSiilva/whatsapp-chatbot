var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

require('dotenv').config({silent: true});

var server = require('./app');
var port = appEnv.port || process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.listen(port, '0.0.0.0', function() {
  console.log('Server running on port: %d', port);
});