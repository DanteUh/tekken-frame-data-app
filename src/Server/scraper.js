/* eslint-disable */
const cheerio = require('cheerio');
const request = require('request');
const requestPromise = require('request-promise');

const utilsPost = require('./utils/postRequest');
const utilsDuplicates = require('./utils/duplicateFilter');
const charactersJson = require('./characterNames.json');
const characterNames = charactersJson.characterNames;

for(let x = 0; x < characterNames.length; x++ ) {
  const url = `http://rbnorway.org/${characterNames[x]}-t7-frames/`;
  let currentCharacter = characterNames[x];

  requestPromise(url)
    .then(html => {
      const $ = cheerio.load(html);

      let unfilteredMoves = [];
      let notUsed = [];

      $('tr').each(function(i, el) {
        var moveObj = {}
        $(el).find('td').each(function(i, td) {
          switch(i) {
            case 0:
              moveObj.command = $(td).text().trim();
              break;
            case 1:
              moveObj.hitLevel = $(td).text().trim();
              break;
            case 2:
              moveObj.damage = $(td).text().trim();
              break;
            case 3:
              moveObj.startUpFrame = $(td).text().trim();
              break;
            case 4:
              moveObj.blockFrame = $(td).text().trim();
              break;
            case 5:
              moveObj.hitFrame = $(td).text().trim();
              break;
            case 6:
              moveObj.counterHitFrame = $(td).text().trim();
              break;
            case 7:
              moveObj.notes = $(td).text().trim();
          }
        });

        if (moveObj.command.includes('Command') && moveObj.hitLevel.includes('Hit level')) {
          notUsed.push(moveObj)
        } else {
          unfilteredMoves.push(moveObj);
        }
      });

      const moves = utilsDuplicates.removeObjectDuplicates(unfilteredMoves, "command");
      
      const character = {
        name: currentCharacter,
        moves,
      };

      return character;

      /* fs.writeFile(`${characterNames[x]}.json`, JSON.stringify(json, null, 4), err => {
        console.log(`File successfully written! - Check the Server directory for the ${characterNames[x]}.json file`);
      }); */
    })
    .then(data => {
      utilsPost.postRequest('http://localhost:8080/characters', data);
    })
    .catch(err => {
      console.log(err);
    });
}
