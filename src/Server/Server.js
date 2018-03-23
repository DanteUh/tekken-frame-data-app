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
      const launchers = [];
      const throws = [];

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
        if (moveObj.hitFrame.includes('Launch') || moveObj.counterHitFrame.includes('Launch')) {
          moveObj.type = 'Launcher';
          launchers.push(moveObj);
        } else if (moveObj.hitFrame.includes('Throw') || moveObj.counterHitFrame.includes('Throw')) {
          moveObj.type = 'Throw';
          throws.push(moveObj);
        } else {
          moveObj.type = 'Basic / Special Move';
          moves.push(moveObj);
        }
      });

      const removeDuplicates = (arr) => {
        const hashTable = {};

        return arr.filter(function (el) {
          const key = JSON.stringify(el);
          let match = Boolean(hashTable[key]);

          return (match ? false : hashTable[key] = true);
        });
      }

      const filteredMoves = removeDuplicates(moves);

      const character = {
        name: currentCharacter,
        filteredMoves,
        launchers,
        throws,
      };

      const json = { character };

      fs.writeFile(`${characterNames[x]}.json`, JSON.stringify(json, null, 4), err => {
        console.log(`File successfully written! - Check the Server directory for the ${characterNames[x]}.json file`);
      });
    }
  });
}
