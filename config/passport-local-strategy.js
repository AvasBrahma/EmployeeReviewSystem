const passport = require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Admin=require('../models/admin');

//authentication using passport

passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email, password,done){

    // Find a admin user and establish the identity
    Admin.findOne({email: email}, function(err, admin){
        if(err){
            console.log('Error in finding user -> Passport');
            return done(err);
        }
        if(!admin || admin.password!=password){
              console.log('Invalid Username/ Password');
              return done(null, false);
        }

        return done(null, user);
    });

}

));

passport.serializeUser(function(admin, done){
    done(null, admin.id);
 });
 
 //Deserialising the user from the key in the cookies
 passport.deserializeUser(function(id,done){
    Admin.findById(id, function(err, admin){
         if(err){
             console.log('Error in finding user ----> Passport');
             return done(err);
         }
          return done(null, admin);
     });
 });
 
// check if the user is authenticated

passport.checkAuthentication=function(req, res, next){
    // if the user is signed in then pass on the request to the next function(controller's action)


    if(req.isAuthenticated()){
       return next();

    }
   //if the user is not signed in
   return res.redirect('/login');
}

passport.setAuthenticatedUser= function(req, res, next){

if(req.isAuthenticated()){
   //req user contains the current signed in user from the session cookie and we are just
   //sending this to the local for the viewa

   res.locals.user=req.user;


}
next();
}



 module.exports=passport;