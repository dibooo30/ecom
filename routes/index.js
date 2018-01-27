var express = require('express');
var router = express.Router();
var Product = require('../moduls/product-modul');


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err, docs){
    var productsChanks =[];
    var chankSize = 3;
    for(var i = 0; i < docs.length; i += chankSize){
      productsChanks.push(docs.slice(i, i + chankSize));
    }
    res.render('index', { title: 'Express', data: docs });
  });
});


module.exports = router;
