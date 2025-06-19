require('dotenv').config();
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
const z = require('zod');
const { generateObject } = require('ai');
var express = require('express');
const fs = require("fs");
const searchNewSources = require('../lib/searchNewSources');
const { addRows } = require('../lib/DatabaseMethods');
var router = express.Router();

const google = createGoogleGenerativeAI({
  apiKey: process.env.API_KEY,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const schema = JSON.parse(fs.readFileSync('./data/schema.json'));
  res.render('index', { title: 'Express', columns: schema.map(col=>col.title) });
});

router.post('/new-sources', async function(req,res,next) {
  const {lastSearchDate} = req.body;
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));

  res.json({data: await searchNewSources(lastSearchDate, keywords)});
});

router.post('/current-sources', function(req,res,next) {

});

router.post('/update-db', function(req,res) {
  const {data} = req.body;

  addRows(...data);

  res.status(200).send(true);
});

module.exports = router;
