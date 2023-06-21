const Admin=require('../models/admin');
const User=require('../models/user');
const Employee=require('../models/employee');
const PerformanceReview=require('../models/performancereviews');
const { formatCreatedAt } = require('../assets/helper/controllerhelper');

module.exports.adminHome=async function(req, res){
    if(req.isAuthenticated()){
        const employees = await Employee.find().exec();
        const performanceReviews = await PerformanceReview.find().exec();
        const totalEmployee=await Employee.count();
        const totalreviews=await PerformanceReview.count();

    return res.render('admin/adminhome',{
        title: "Home",
        totalEmployee,
        totalreviews
    });
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
             title: "Employees",
             pages: Math.ceil(totalEmployee/perPage),
             totalEmployee  
        
        });
       
    } catch (error) {

        console.log('Error:', error);
        
    }

    
}

module.exports.viewAllReviews=async function(req, res){


    let perPage=12;
    // if we don't get nunber the default value will be 1

    let page=req.query.page||1;
    try {
         //To get the records sorted by at Updated
        const reviews=await PerformanceReview.aggregate([{ $sort: { updatedAt: -1 }}])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();

          const totalreviews=await PerformanceReview.count();
          
           console.log("Total Employees", totalreviews);
          return res.render('admin/viewallreviews', {
             reviews,
             current: page,
             formatCreatedAt,
             title: "Reviews",
             pages: Math.ceil(totalreviews/perPage),
        
        });
       
    } catch (error) {

        console.log('Error:', error);
        
    }

    
}


module.exports.viewEmployee=async function(req, res){
    try {
        const employee= await Employee.findOne({_id: req.params.id});
        let perPage=12;
        let page=req.query.page||1;
        const performanceReviews = await PerformanceReview.find({ employee: req.params.id}).sort({ updatedAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
  
        res.render('admin/viewemployee', {
            employee,
            performanceReviews,
            formatCreatedAt,
            title: 'Employee Profile'
           
        });
        
     } catch (error) {
          console.log('Error', error);
     }
  
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



module.exports.addReview=async function(req, res){

    const user= await User.findOne({_id: req.params.id});
    console.log('Review Body : ', req.body);
    console.log('Reviewer details : ', user);
            const review={
                empname: req.body.employeeName,
                reviewdate:req.body.reviewDate,
                performancecriteria:req.body.performanceCriteria,
                feedback:req.body.feedback,
                rating:req.body.rating,
                employee:req.body.employeeId,
                reviewer:req.params.id,
                reviewername:user.name
              }
              try {

                
                const newReview= new PerformanceReview(review);
                await PerformanceReview.create(newReview);
                const employee= await Employee.findOne({_id: req.body.employeeId});
                res.render('admin/viewemployee', {
                    employee,
                    title: 'Employee Profile'
                   
                });
                
              } catch (error) {
                console.log('Error:', error);
              }
                
   
}


module.exports.viewEmployeePerformance=async function(req, res){
    try {
       
  
        res.render('admin/viewperformance', {

            title: 'Employee Performance'
           
        });
        
     } catch (error) {
          console.log('Error', error);
     }
  
}