var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticeted, function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('profile', {title:'profile', name:req.user.username});

});

function ensureAuthenticeted(req, res, next){
  if( req.isAuthenticated() ){
     return next();
  }
  res.redirect('/users/signin');
}

router.get('/logout', function (req, res, next) {
  req.logout();
  req.flash('login-done', 'you are loggout');
  res.redirect('/users/signin');
});
module.exports = router;