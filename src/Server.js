const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const url = 'http://www.imdb.com/title/tt1229340/';

request(url, (error, res, html) => {
  if(!error){
    const $ = cheerio.load(html);
    console.log(html);
    const title, release, rating;
    const json = { title: '', release: '', rating: '' };

    $('.header').filter( () => {
      const data = $(this);
      title = data.children().first().text();
      release = data.children().last().children().text();

      json.title = title;
      json.release = release;
    })
  }
});