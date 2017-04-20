var express = require('express');
var bodyParser = require('body-parser'); // parser for post requests
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var countRecod = 0;
var dbprints = require('../dao/genericDAO');


var app = express();
app.use(bodyParser.json({type: 'application/json' }));

const conversation = new ConversationV1({
  username: 'fb3ea18a-08b4-48ee-ac83-630fe19a68ef',
  password: '6qOUoIn3UXnD',
  version_date: ConversationV1.VERSION_DATE_2017_02_03
});

const message = function(text) {
    const payload = {
        input: {'text': text},
        workspace_id: 'd6fe397a-343b-47b5-a132-a1def577b235'
    };
    return new Promise((resolve, reject) => conversation.message(payload, function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    }));
};

app.post('/message', function(req, res) {
    var text = req.body.text;
    console.log(text);

    message(text).then(data => {
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(updateMessage(data)));
    }).catch(err => {
        console.error(JSON.stringify(err, null, 2));
    });
});

function updateMessage(response) {
    var responseText = null;


    if (!response.output) {
        response.output = {};
    } else {

        var longDate = new DateTime();
        var intent = response.intents[0];
        countRecod = countRecod + 1;
        
        console.log(JSON.stringify(intent));

        dbprints.insert({ 'whatsapp-chatbot': response}, 'whatsapp_' + countRecod + '_' + longDate, function(err, body, header) {
                        if (err) {
                            console.log('Error creating document - ', err.message);
                            return;
                        }
                        console.log('all records inserted.')
                        console.log(body);
                        });
        return response;
    }
    console.log(" === Passou por aqui: function updateMessage === ");
    if (response.intents && response.intents[0]) {
        var intent = response.intents[0];

        if (intent.confidence >= 0.75) {
            responseText = 'I understood your intent was ' + intent.intent;
        } else if (intent.confidence >= 0.5) {
            responseText = 'I think your intent was ' + intent.intent;
        } else {
            responseText = 'I did not understand your intent';
        }
    }
    response.output.text = responseText;
    return response;
}

module.exports = app;