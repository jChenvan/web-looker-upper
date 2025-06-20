require('dotenv').config();
var express = require('express');
const fs = require("fs");
const searchNewSources = require('../lib/searchNewSources');
const { addRows } = require('../lib/DatabaseMethods');
const searchCurrentSources = require('../lib/searchCurrentSources');
var router = express.Router();

// Search new sources
router.post('/new-sources', async function(req,res,next) {
  const {lastSearchDate} = req.body;
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));

  res.json({data: await searchNewSources(lastSearchDate, keywords)});
});

// Search existing sources
router.post('/current-sources', async function(req,res,next) {
  const {lastSearchDate} = req.body;
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));

  res.json({data: await searchCurrentSources(lastSearchDate, keywords)});
});

// Add entries to db
router.post('/update-db', function(req,res) {
  const {data} = req.body;

  addRows(...data);

  res.status(200).send();
});

// Add urls to be monitored
router.post('/update-urls', function(req,res) {
  const {newUrls} = req.body;
  const urls = JSON.parse(fs.readFileSync('./data/urls.json'));
  newUrls.forEach(url => {if (!urls.includes(url)) urls.push(url)});

  fs.writeFileSync('./data/urls.json', JSON.stringify(urls,null,2));

  res.status(200).send();
});

// Add keywords

router.post('/add-keyword', function(req,res) {
  const { keyword: newKeyword } = req.body;
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));
  const update = !keywords.includes(newKeyword);
  if (update) keywords.push(newKeyword);

  fs.writeFileSync('./data/keywords.json', JSON.stringify(keywords,null,2));

  res.json({update});
});

// Remove keywords

router.post('/remove-keyword', function(req,res) {
  const { keyword } = req.body;
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json')).filter(kw => (kw !== keyword));

  fs.writeFileSync('./data/keywords.json', JSON.stringify(keywords,null,2));

  res.status(200).send();
});

module.exports = router;
