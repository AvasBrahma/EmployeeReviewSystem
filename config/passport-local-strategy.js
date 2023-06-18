const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin=require('../models/admin');
const User=require('../models/user');
//authentication using passport

passport.use(new LocalStrategy({
    usernameField:'email'
},
async function(email, password,done){

    // Find a admin user and establish the identity
    const user=await User.findOne({email: email});
    if(user){
        if(!user || user.password!=password){
            console.log('Invalid Username/ Password');
            return done(null, false);
      }
      return done(null, user);
    } else {
            console.log('Error in finding user -> Passport');
            return done(null, false);
        }
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
 });
 
 //Deserialising the user from the key in the cookies
 passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      if (user) {
        return done(null, user);
      } else {
        console.log('Error in finding user ----> Passport');
        return done(null, false);
      }
    } catch (err) {
      console.log('Error in finding user ----> Passport', err);
      return done(err);
    }
  });
 
// check if the user is authenticated

passport.checkAuthentication=function(req, res, next){
    // if the user is signed in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
       return next();

    }
   //if the user is not signed in
   return res.redirect('/sign-in');
}
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('sending this to the locals for the views');
      res.locals.user = req.user;
    }
    next();
  };
  


 module.exports=passport;