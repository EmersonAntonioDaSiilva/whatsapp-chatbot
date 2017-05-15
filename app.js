var express = require('express');
var app = express();

var rsfConversation = require('./restful/conversation');

app.use(express.static(__dirname + '/public'));
app.use(rsfConversation);


module.exports = app;