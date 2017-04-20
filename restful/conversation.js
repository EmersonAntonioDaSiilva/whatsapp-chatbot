var express = require('express');
var bodyParser = require('body-parser'); // parser for post requests
const watson = require('watson-developer-cloud');

var countRecod = 0;
var dbprints = require('./dao/genericDAO');


var app = express();
app.use(bodyParser.json({type: 'application/json' }));

const conversation = new watson.conversation({
  username: 'fb3ea18a-08b4-48ee-ac83-630fe19a68ef',
  password: '6qOUoIn3UXnD',
  version: 'v1',
  version_date: '2017-02-03'
});

const message = function(text, context) {
    const payload = {
        workspace_id: 'd6fe397a-343b-47b5-a132-a1def577b235',
        input: {'text': text},
        context: context
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
    var context = JSON.stringify(req.body.context);

    message(text, context).then(data => {
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