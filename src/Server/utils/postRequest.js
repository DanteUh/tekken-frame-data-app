/* eslint-disable */
const request = require('request');

exports.postRequest = (url, data) => {
  request.post(
    url,
    data,
    (error, res, body) => {
      if(!error && res.statusCode === 200){
        console.log(body);
      }
    }
  );
};
