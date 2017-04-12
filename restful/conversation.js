var express = require('express');
var bodyParser = require('body-parser'); // parser for post requests
const watson = require('watson-developer-cloud');

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

    message(text, undefined).then(data => {
        return res.send(JSON.stringify(data));
        //return updateMessage(data);
    }).catch(err => {
        console.error(JSON.stringify(err, null, 2));
    });
});

function updateMessage(response) {
    var responseText = null;
    if (!response.output) {
        response.output = {};
    } else {
        return response;
    }
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