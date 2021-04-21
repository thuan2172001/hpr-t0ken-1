const api = require('express').Router();
const path = require('path');
const globby = require('globby');

api.get('/', (req, res) => {
  res.json({
    msg: `Welcome to demo`,
  });
}); 
 
const apis = globby.sync('**/*.controller.js', { cwd: './app/api/' });
apis.map((t) => require(path.resolve(`./app/api/${t}`))).forEach((subApi) => api.use(subApi));

console.log(apis)
module.exports = api;
