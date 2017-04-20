var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var dbCreds =  appEnv.getServiceCreds('analitycsNLCdb');
var nano, prints;

exports.prints = function() {
    if (prints === null) {
        if (dbCreds) {
            nano = require('nano')(dbCreds.url);
            prints = nano.use('prints');
        } else {
            console.log('NO DB!');
        }
    }
    return prints;
}
