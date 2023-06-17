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
 
 module.exports=passport;