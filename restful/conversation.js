var express = require('express');
var bodyParser = require('body-parser'); // parser for post requests
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var countRecod = 0;

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var dbCreds =  appEnv.getServiceCreds('analitycsNLCdb');

var nano;

if (dbCreds) {
	console.log('URL is ' + dbCreds.url);
	nano = require('nano')(dbCreds.url);
} else {
    nano = require('nano')('https://ab46cb82-f091-4fea-b622-11049ed033af-bluemix:9c25511ba5185fde1746a9f31bd8b351c75510b7c8aca12c9ccf3c5bc14c0f2e@ab46cb82-f091-4fea-b622-11049ed033af-bluemix.cloudant.com');
}

var prints = nano.use('prints');

var chatbot = express();
chatbot.use(bodyParser.json({type: 'application/json' }));

var username = process.env.CONVERSATION_USERNAME || '<username>';
var password = process.env.CONVERSATION_PASSWORD || '<password>';
var workspace = process.env.WORKSPACE_ID || '<workspace-id>';

const conversation = new ConversationV1({
  username: username,
  password: password,
  version_date: ConversationV1.VERSION_DATE_2017_02_03
});

const message = function(text) {
    const payload = {
        input: {'text': text},
        workspace_id: workspace
    };
    return new Promise((resolve, reject) => conversation.message(payload, function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    }));
};

chatbot.post('/message', function(req, res) {
    var text = req.body.text;

    message(text).then(data => {
        res.send(JSON.stringify(updateMessage(data)));
    }).catch(err => {
        console.error(JSON.stringify(err, null, 2));
    });
});

function updateMessage(response) {
    console.log(JSON.stringify(response));
    countRecod ++;        

    prints.insert({ 'whatsapp-chatbot': response}, 'whatsapp_' + countRecod, function(err, body, header) {
        if (err) {
            console.log('Error creating document - ', err.message);
            return;
        }
        console.log('all records inserted.')
        console.log(body);
    });
    return response;
}

module.exports = chatbot;