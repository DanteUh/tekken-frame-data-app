/* eslint-disable */

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const url = 'http://www.imdb.com/title/tt1229340/';

request(url, (error, res, html) => {
  if(!error){
    const $ = cheerio.load(html);

    const title = $('.title_wrapper').children().first().text();
    const release = $('title_wrapper, .subtext').children().last().text();
    const rating = $('.ratingValue').children().children().text();

    const json = { title, release, rating };

    fs.writeFile('output.json', JSON.stringify(json, null, 4), err => {
      console.log('File successfully written! - Check the Server directory for the output.json file');
    });
  }
});