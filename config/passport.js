var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../moduls/users-modul');


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local.signup', new LocalStrategy({
      usernamefild:'email',
      passwordfild:'password',
      passReqToCallback:true
  }, function(req, email, password, done) { 
    User.findOne({email:req.body.email}, function(err, user) {
      if(err){
          return done(err)
      }else if(user){
        return done(null, false, {message: 'email is alredy used'});
      } else {
        var newUser = new User();
            // newUser.local.email = email;
            newUser.local.password = newUser.encryptPassword(req.body.password);     
            newUser.save(function(err, result){
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
      }
      
  });
}));