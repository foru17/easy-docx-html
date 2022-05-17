var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/personal', function(req,res,next){
  res.send(req.query)
})

router.post('/favorite', function(req, res, next){
  res.send(req.body)
})

module.exports = router;
