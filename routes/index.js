var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.dir(res.cache)
  res.render('index', { title: 'Sezzle Calculator', cache: res.cache });
});

module.exports = router;
