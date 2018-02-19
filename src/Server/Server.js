/* eslint-disable */

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const characters = [
  'akuma',
  'alisa',
  'asuka',
  'bob',
  'bryan',
  'claudio',
  'devil-jin',
  'dragunov',
  'eddy',
  'eliza',
  'feng',
  'geese',
  'gigas',
  'heihachi',
  'jack7',
  'jin',
  'josie',
  'katarina',
  'kazumi',
  'kazuya',
  'king',
  'kuma',
  'lars',
  'law',
  'lee',
  'leo',
  'lili',
  'lucky-chloe',
  'master-raven',
  'miguel',
  'nina',
  'paul',
  'shaheen',
  'xiaoyu',
  'yoshimitsu'
];

const url = 'http://rbnorway.org/lars-t7-frames/';

request(url, (error, res, html) => {
  if(!error){
    const $ = cheerio.load(html);

    let command, hitLevel, damage, startUpFrame, blockFrame, hitFrame, counterHitFrame, notes;

    const moveObject = () => {
      return {
        command,
        hitLevel,
        damage,
        startUpFrame,
        blockFrame,
        hitFrame,
        counterHitFrame,
        notes
      };
    };

    for(let i = 0; i <= 8; i++){
      const theWholeChabang = $('table tbody').children().eq(i).text();
      console.log(theWholeChabang);
    }

    //hitLevel = $('table tbody').children().first().children().eq(1).text();

    const moveData =  moveObject();
    let i = 0;

    for(let property in moveData) {
      moveData[property] = $('table tbody tr').children().eq(i).text();
      i++;
    }

    const json = { moveData };

    fs.writeFile('output.json', JSON.stringify(json, null, 4), err => {
      console.log('File successfully written! - Check the Server directory for the output.json file');
    });
  }
});