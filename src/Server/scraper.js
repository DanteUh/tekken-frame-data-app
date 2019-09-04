/* eslint-disable */
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const utilsPost = require('./utils/postRequest');
const utilsDuplicates = require('./utils/duplicateFilter');
const charactersJson = require('../shared/characterNames.json');
const characterNames = charactersJson.characterNames;

for ( let x = 0; x < characterNames.length; x++ ) {
  /*
    We create a IIFE because we want to delay each request call with 5 seconds
    The function has to call it self after each iteration because setTimeout() only execute things once
  */
  ((x) => {
    setTimeout(() => {
      let currentCharacter = characterNames[x];
      let options = {
        uri: `http://rbnorway.org/${characterNames[x]}-t7-frames/`,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      // Connect to url
      requestPromise(options)
        .then($ => {
          let unfilteredMoves = [];
          let notUsed = [];

          // Loop through each table row
          $('tr').each(function(i, el) {
            let moveObj = {}

            // Loop through each td and take the value from it
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

            // Move unnecessary values to a non used array
            if (moveObj.command === 'Command' && moveObj.hitLevel === 'Hit level') {
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

          /*
            This code is to write physical .json files of every character. Im keeping it in here just in case.

            fs.writeFile(`${characterNames[x]}.json`, JSON.stringify(json, null, 4), err => {
              console.log(`File successfully written! - Check the Server directory for the ${characterNames[x]}.json file`);
            });
          */
        })
        .then(data => {    
          console.log(data);
          utilsPost.postRequest('http://localhost:8080/characters', data);
          utilsPost.postRequest('http://localhost:8080/characters/name', {name: data.name});
          
        })
        .catch(err => {
          console.error(err);
        })
    }, 5000*x)
  })(x)
}
