var express = require('express');
var bodyParser = require('body-parser'); // parser for post requests
const watson = require('watson-developer-cloud');

var app = express();
app.use(bodyParser.json());

const conversation = new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME || '<conversation_username>',
  password: process.env.CONVERSATION_PASSWORD || '<conversation_password>',
  version_date: watson.ConversationV1.VERSION_DATE_2017_02_03
});

const message = function(text, context) {
    const payload = {
        workspace_id: process.env.WORKSPACE_ID || '<workspace_id>',
        input: {
            text: text
        },
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
    message('first message', undefined).then(data => {
        console.log(JSON.stringify(data, null, 2), '\n--------');
        return updateMessage(data);
    }).catch(err => {
        // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
        // FROM CONVERSATION SERVICE
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