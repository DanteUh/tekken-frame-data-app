/* eslint-disable */

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const characterJson = require('./characterNames.json');

const characterNames = characterJson.characterNames; 

for(let x = 0; x <= characterNames.length; x++ ) {

  const url = `http://rbnorway.org/${characterNames[x]}-t7-frames/`;

  let currentCharacter = characterNames[x];
  
  request(url, (error, res, html) => {
    if(!error){
      const $ = cheerio.load(html);

      const moves = [];

      $('tr').each(function(i, el) {
        var moveObj = {}
        $(el).find('td').each(function(i, td) {
          switch(i) {
            case 0:
              moveObj.command = $(td).text();
              break;
            case 1:
              moveObj.hitLevel = $(td).text();
              break;
            case 2:
              moveObj.damage = $(td).text();
              break;
            case 3:
              moveObj.startUpFrame = $(td).text();
              break;
            case 4:
              moveObj.blockFrame = $(td).text();
              break;
            case 5:
              moveObj.hitFrame = $(td).text();
              break;
            case 6:
              moveObj.counterHitFrame = $(td).text();
              break;
            case 7:
              moveObj.notes = $(td).text();
          }
        });
        moves.push(moveObj);
      });

      const character = {
        name: currentCharacter,
        moves,
      };

      const json = { character };

      fs.writeFile(`${characterNames[x]}.json`, JSON.stringify(json, null, 4), err => {
        console.log(`File successfully written! - Check the Server directory for the ${characterNames[x]}.json file`);
      });
    }
  });
}
