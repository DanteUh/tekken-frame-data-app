/* eslint-disable */

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const characterNames = [
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

for(let x = 0; x <= characterNames.length; x++ ) {

  const url = `http://rbnorway.org/${characterNames[x]}-t7-frames/`;

  request(url, (error, res, html) => {
    if(!error){
      const $ = cheerio.load(html);

      const moves = [];

<<<<<<< HEAD
    const dataTableLength = $('table tbody').find('tr').length;
    //console.log(dataTableLength);

    /* const itteratingArray = $('td').map((i, el) => {
      return $(this).text();
    }).get().join(' ');
    console.log(itteratingArray); */

    for(let i = 0; i <= 8; i++){
      const tableRowData = $('table tbody').children().eq(i).children().text();
      //console.log(tableRowData);
    }

    //hitLevel = $('table tbody').children().first().children().eq(1).text();
=======
      $('tr').each(function(i, el) {
        var obj = {}
        $(el).find('td').each(function(i, td) {
          switch(i) {
            case 0:
              obj.command = $(td).text();
              break;
            case 1:
              obj.hitLevel = $(td).text();
              break;
            case 2:
              obj.damage = $(td).text();
              break;
            case 3:
              obj.startUpFrame = $(td).text();
              break;
            case 4:
              obj.blockFrame = $(td).text();
              break;
            case 5:
              obj.hitFrame = $(td).text();
              break;
            case 6:
              obj.counterHitFrame = $(td).text();
              break;
            case 7:
              obj.notes = $(td).text();
          }
        });
        moves.push(obj)
      });
>>>>>>> 600b1382d36e87adc0482011d439a259fff29c83

      const json = { moves };

      fs.writeFile(`${characterNames[x]}.json`, JSON.stringify(json, null, 4), err => {
        console.log(`File successfully written! - Check the Server directory for the ${characterNames[x]}.json file`);
      });
    }
  });
}
