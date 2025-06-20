require('dotenv').config();
var express = require('express');
const fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const schema = JSON.parse(fs.readFileSync('./data/schema.json'));
  res.render('index', { title: 'Express', columns: schema.map(col=>col.title) });
});

router.get('/keywords', function(req, res, next) {
  const keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));
  res.render('keywords', { title: 'Express', keywords });
});

router.get('/schema', function(req, res, next) {
  const schema = JSON.parse(fs.readFileSync('./data/schema.json'));
  res.render('schema', { title: 'Express', columns: schema.map(col=>col.title) });
});

router.get('/urls', function(req, res, next) {
  const schema = JSON.parse(fs.readFileSync('./data/schema.json'));
  res.render('urls', { title: 'Express', columns: schema.map(col=>col.title) });
});

module.exports = router;
