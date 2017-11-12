const GoogleSpreadSheet = require('google-spreadsheet');

const sheetApp = new GoogleSpreadSheet('1-xtq27O6xvcpejVEajLj9MSwZugqncc5Ru_h8ugD8JM');
const credentials = require('../mouso-boyfriend-6d2a7a462672.json');

let baseData;

sheetApp.useServiceAccountAuth(credentials, err => {
  sheetApp.getInfo((err, data) => {
    const sheets = data;
    for (let i in sheets.worksheets) {
      const sheet = sheets.worksheets[i];
      baseData = getBaseData(sheet);
    }
  })
});

function getBaseData(sheet) {
  if (sheet.title !== 'base') return;
  sheet.getRows((err, rows) => {
    const data = [];
    for (let i in rows) {
      const row = rows[i];
      const obj = {
        keywords: row.keyword,
        category: row.category,
        type: row.type,
        option: row.option,
        content: row.content,
      }
      data.push(obj);
    }
    return data;
  })
}

exports.baseData = baseData;


