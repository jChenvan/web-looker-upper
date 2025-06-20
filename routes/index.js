require('dotenv').config();
var express = require('express');
const fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const schema = JSON.parse(fs.readFileSync('./data/schema.json'));
  res.render('index', { title: 'Express', columns: schema.map(col=>col.title) });
});

module.exports = router;
