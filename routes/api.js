require('dotenv').config();
var express = require('express');
const fs = require("fs");
const searchNewSources = require('../lib/searchNewSources');
const { addRows } = require('../lib/DatabaseMethods');
const searchCurrentSources = require('../lib/searchCurrentSources');
var router = express.Router();

router.post('/new-sources', async function(req,res,next) {
  const {lastSearchDate} = req.body;
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));

  res.json({data: await searchNewSources(lastSearchDate, keywords)});
});

router.post('/current-sources', async function(req,res,next) {
  const {lastSearchDate} = req.body;
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));

  res.json({data: await searchCurrentSources(lastSearchDate, keywords)});
});

router.post('/update-db', function(req,res) {
  const {data} = req.body;

  addRows(...data);

  res.status(200).send();
});

router.post('/update-urls', function(req,res) {
  const {newUrls} = req.body;
  const urls = JSON.parse(fs.readFileSync('./data/urls.json'));
  newUrls.forEach(url => {if (!urls.includes(url)) urls.push(url)});

  fs.writeFileSync('./data/urls.json', JSON.stringify(urls,null,2));

  res.status(200).send();
});

module.exports = router;
