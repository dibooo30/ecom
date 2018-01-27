var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Product = require('../moduls/product-modul');
var User = require('../moduls/users-modul');
var csrf = require('csurf');
var csrfProtction = csrf();
router.use(csrfProtction);

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', {csrfToken:req.csrfToken(), title:'sign-up'});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', {csrfToken:req.csrfToken(), title: 'sign-in'});
});

router.post('/signin',
  passport.authenticate('local', {failureRedirect:'/users/signin', failureFlash:'invaled username or password'}),
  function(req, res, next) {
            req.flash('login-done', 'welcome ' + req.user.username);
            res.redirect('/profile');
      });

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(function(username, password, done) {
  User.getUserByUsername(username, function(err, user) {
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'unknown user'});
    }
// to compare password with user password
    User.comparePassword(password, user.password, function(err, isMatch) {
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false,  {message: 'invaled password'});
      }
    });
  });
}));

router.post('/signup', function(req, res, next) {

  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
 req.checkBody('email', 'Email is required and must be an email').isEmail();
 req.checkBody('email', 'Email is required.').notEmpty();
 req.checkBody('username', 'username is required.').notEmpty();
 req.checkBody('password', 'password is required.').notEmpty();
 req.checkBody('password2', 'your re pass is not equals password field').equals(req.body.password);


 var errors = req.validationErrors();

 if(errors){
  res.render('signup', {errors: errors});
  } else{
   console.log('no errors');
   var newUser = new User({
     username:username,
     email:email,
     password:password
   });
   User.createUser(newUser, function(err, user) {
     if(err) throw err;
     console.log(user);
   });

    req.flash("login-done", "registry is success");
   
   res.location('/');
   res.redirect('/users/signin');
 }

});


module.exports = router;

