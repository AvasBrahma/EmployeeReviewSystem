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
        const performanceReviews = await PerformanceReview.find({ employeeid: req.params.id}).sort({ updatedAt: -1 })
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
    return res.render('admin/create-account',{
        title: "Create Account"
    });
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
                empname: req.body.empname,
                reviewdate:req.body.reviewDate,
                performancecriteria:req.body.performanceCriteria,
                feedback:req.body.feedback,
                rating:req.body.rating,
                employeeid:req.body.employeeId,
                reviewerid:req.params.id,
                reviewername:user.name,
                assignorid:req.params.id,
                assignorname:user.name,
                feedbackstatus: "Pending"
              }
              try {

                
                const newReview= new PerformanceReview(review);
                await PerformanceReview.create(newReview);
                res.redirect(`/admin/viewemployee/${req.body.employeeId}`);
                
              } catch (error) {
                console.log('Error:', error);
              }
                
   
}


module.exports.viewAssignedEmployee=async function(req, res){
        try {           
             const excludedId = req.params.id;
             
             console.log("excluded ID :", excludedId);
             const excludedEmployee = await Employee.findById(excludedId).exec();
        

             const employee = await Employee.find({ _id: { $ne: excludedId } })
               .sort({ updatedAt: -1 })
               .exec();
            
              return res.render('admin/viewAssignedEmployee', {
                 employee,
                 excludedEmployee,
                 title: "Employees",

            });
        
     } catch (error) {
          console.log('Error', error);
     }
  
}



module.exports.assignedReview=async function(req, res){

   try{

    const assignorId = req.params.id;
    const user= await User.findOne({_id: assignorId});
    const assignorname =user.name
    console.log(' assignorId: ', assignorId);
    console.log(' Reviewer Id : ', req.body);
   
// Get the selected reviewer id from the request body
const selectedReviewerId = req.body.reviewerid;

const assignedreview = {
  empname: req.body[`employeename_${selectedReviewerId}`],
  employeeid: req.body[`employeeid_${selectedReviewerId}`],
  reviewerid: selectedReviewerId,
  reviewername: req.body[`reviewername_${selectedReviewerId}`],
  assignorid: assignorId,
  assignorname: assignorname
};

        console.log("Assinged ::::::::::", assignedreview);
        const newReviewAssigned= new PerformanceReview(assignedreview);
        await PerformanceReview.create(newReviewAssigned); 
             res.redirect('/admin/viewallemployees');
          
                
              } catch (error) {
                console.log('Error:', error);
              }
                
   
}




module.exports.deleteReviews= async(req, res)=>{

    try {
       await PerformanceReview.deleteOne({
          _id: req.params.id
       })
       res.redirect('/admin/viewallReviews');
       
    } catch (error) {
       console.log('error', error);
    }
 
 }
 
 
 module.exports.deleteUser= async(req, res)=>{

    try {
       await User.deleteOne({
          _id: req.params.id
       })

       const admin= await Admin.findOne({_id: req.params.id});
       if(admin){
        await Admin.deleteOne({
            _id: req.params.id
         })
       } else{
        await Employee.deleteOne({
            _id: req.params.id
         })
         
       }
    
       res.redirect('/admin/viewallemployees');
       
    } catch (error) {
       console.log('error', error);
    }
 
 }
 