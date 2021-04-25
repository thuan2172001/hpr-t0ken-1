const globby = require('globby');
const path = require('path');
const fs = require('fs-extra');

const readFile = async (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (error, data) => {
    if (error) return reject(error);
    resolve(data);
  })
});
const getCSVFiles = async (fileName) => {
  const dir = path.posix.join(__dirname.split('\\').join('/'), 'data')
  return globby(`${dir}/*${fileName}.csv`)
};

const getContentCSVFiles = async (file) => {
  let lines = await readFile(file);
  lines = lines.split('\n');
  return {
    header: lines[0].split(',').map((item) => item.replace(/(\r\n|\n|\r)/gm, '')),
    content: lines.slice(1),
  };
};

const cleanField = (field) => field.map((item) => item.replace(/(\r\n|\n|\r)/gm, ''));

module.exports = {
  getCSVFiles,
  getContentCSVFiles,
  cleanField
};
