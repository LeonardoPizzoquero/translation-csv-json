const xlsxFile = require('read-excel-file/node');
const fs = require('fs');
const keys = require('./keys.json');

const parsedKeys = Object.entries(keys);
const sortedKeys = parsedKeys.sort((a, b) => a[1].trim().localeCompare(b[1].trim()));

xlsxFile('./file.xlsx').then((rows) => {
  const ptColumn = [];
  const enColumn = [];
  const esColumn = [];

  const sortedRows = rows.sort((a, b) => a[0].trim().localeCompare(b[0].trim()));

  sortedRows.map((row) => {
    ptColumn.push(row[0]);
    enColumn.push(row[1]);
    esColumn.push(row[2]);
  })

  const ptObjectsToJson = {};
  const enObjectsToJson = {};
  const esObjectsToJson = {};

   ptColumn
      .map((row, index) => {
        return { [parsedKeys[index][0]]: row }
      })
      .map((obj) => Object.assign(ptObjectsToJson, obj));

    enColumn
      .map((row, index) => ({ [sortedKeys[index][0]]: row }))
      .map((obj) => Object.assign(enObjectsToJson, obj));
      
    esColumn
      .map((row, index) => ({ [sortedKeys[index][0]]: row }))
      .map((obj) => Object.assign(esObjectsToJson, obj));

    fs.writeFile('pt.json', JSON.stringify(ptObjectsToJson), 'utf8', () => {});
    fs.writeFile('en.json', JSON.stringify(enObjectsToJson), 'utf8', () => {});
    fs.writeFile('es.json', JSON.stringify(esObjectsToJson), 'utf8', () => {});
}); 
