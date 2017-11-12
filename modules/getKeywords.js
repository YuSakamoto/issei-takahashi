const GoogleSpreadSheet = require('google-spreadsheet');

const sheetApp = new GoogleSpreadSheet('1-xtq27O6xvcpejVEajLj9MSwZugqncc5Ru_h8ugD8JM');
const credentials = require('../mouso-boyfriend-6d2a7a462672.json');

let sheets;
sheetApp.useServiceAccountAuth(credentials, err => {
  sheetApp.getInfo((err, data) => {
    sheets = data;
    for (let i in sheets.worksheets) {
      const sheet = sheets.worksheets[i];
      if (sheet.title === 'base') {
        sheet.getRows((err, rows) => {
          for (let i in rows) {
            console.log(rows[i], "row");
          }
        })
      }
    }
  })
})