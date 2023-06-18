const Admin=require('../models/admin');
const User=require('../models/user');
const Employee=require('../models/employee');

module.exports.adminHome=function(req, res){
    if(req.isAuthenticated()){
    return res.render('admin/adminhome');
    }
    return res.render('login',{
        title: "Sign In"
    });
}

module.exports.viewAllEmployees=async function(req, res){


    let perPage=12;
    // if we don't get nunber the default value will be 1

    let page=req.query.page||1;
    try {
         //To get the records sorted by at Updated
        const employee=await Employee.aggregate([{ $sort: { updatedAt: -1 }}])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();

          const totalEmployee=await Employee.count();
          
           console.log("Total Employees", totalEmployee);
          return res.render('admin/viewallemployees', {
             employee,
             current: page,
             title: "home",
             pages: Math.ceil(totalEmployee/perPage),
             totalEmployee  
        
        });
       
    } catch (error) {

        console.log('Error:', error);
        
    }

    
}

module.exports.viewEmployee=function(req, res){
    return res.render('admin/viewemployee');
}



module.exports.createAccount=async function(req, res){
    return res.render('admin/create-account');
}




module.exports.addAccount=async function(req, res){

    console.log("add Account New Data :",req.body);
    try {

    console.log(req.body);
    const user={
           name: req.body.fullname,
           email:req.body.email,
           phonenumber:req.body.phonenumber,
           role:req.body.role,
           password:req.body.password
    }
    const newUser= new User(user);

    if(req.body.role=='employee'){
       const newEmployee= new Employee(user);
        await Employee.create(newEmployee);
        await User.create(newUser);
        console.log("New Employee Added To DB");
        res.redirect('/admin/viewallemployees');

    } else{
       const newAdmin= new Admin(user);
       await Admin.create(newAdmin);
       await User.create(newUser);
       console.log("New admin Added To DB");
       res.redirect('/admin/viewallemployees');
    }
    
    } catch (error) {
         console.log('Error:', error);
    }
}
