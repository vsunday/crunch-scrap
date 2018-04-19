const scraper = require('./scraper');
const sender = require("./sender");

const TEXT = 'text';
const RESPONSE_URL = "response_url";

function preprocessRequest(event) {
    const body = decodeURIComponent(event.body);
    const params = {};
    body.split('&').forEach(
        (element) => {
            const list = element.split('=');
            params[list[0]] = list[1];
        });
    return params;
}

function prepareResponse(res) {
    const body = {'text': res};
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(body)
    };
}

exports.handler = (event, context, callback) => {
    const params = preprocessRequest(event);
    console.log('params: ' + JSON.stringify(params,null,4));
    sender(params[RESPONSE_URL], 'retrieving data... just a moment plaese!');
    
    let response;
    scraper(params[TEXT]).then(
        (result) => {
            sender(params[RESPONSE_URL], result);
            response = prepareResponse('just a moment');
            console.log('response: ' + response);
            callback(null, response);
        },
        (err) => {
            response = prepareResponse(err);
            console.log('err: ' + err);
            callback(err, response);
        });
};