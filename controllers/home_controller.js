const User=require('../models/user');
module.exports.createAccount=async function(req, res){
    return res.render('create-account');
}

module.exports.home= async function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/');
     }
     return res.render('login',{
         title: "Sign In"
     });
}



module.exports.addAccount=async function(req, res){

     console.log("add Account New Data :",req.body);

     console.log(req.body);
     const newUser= new User({
        name: req.body.fullname,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        role:req.body.role,
        password:req.body.password
     })

     try {

        await User.create(newUser);
        console.log("New User Added To DB");
        res.redirect('/');

        
     } catch (error) {
          console.log('Error:', error);
     }
}

// Sign in and create an session for the user
module.exports.createSession=function(req, res){
    console.log('success','Logged in Successfully');
     if (req.user.role === 'admin') {
        return res.redirect('/admin');
      } else if (req.user.role === 'employee') {
        return res.redirect('/employee');
      } else{
            console.log('No User Role Found......');
      }

  }

  module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
     }
     return res.render('login',{
         title: "Sign In"
     });
 
  }

  module.exports.signOut=function(req, res){
    //before redirecting we need to destroy the session
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    return res.redirect('/');

}
