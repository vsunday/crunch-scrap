const request = require("request");

module.exports = function (url, result) {
  const options = {
    'url': url,
    'headers': {
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify({'text': result})
  };
  
  request.post(options, (error, response, body) => {
    if (error) throw error;
    console.log('done');
  });
};
