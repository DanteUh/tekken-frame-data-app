/* eslint-disable */
const request = require('request');

exports.postRequest = (url, jsonData) => {
  request.post({
    url,
    body: jsonData,
    json: true,
  }, (error, res, body) => {
      if(!error && res.statusCode === 200){
        console.log(body);
      }
    }
  );
};
