var express = require('express');
var router = express.Router();

/* GET doc listing. */
router.get('/', function(req, res, next) {
  res.send('respond doc');
});

module.exports = router;
