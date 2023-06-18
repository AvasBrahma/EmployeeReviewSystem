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