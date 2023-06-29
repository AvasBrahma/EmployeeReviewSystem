const Admin=require('../models/admin');
const User=require('../models/user');
const Employee=require('../models/employee');
const PerformanceReview=require('../models/performancereviews');

const { formatCreatedAt } = require('../assets/helper/controllerhelper');

module.exports.empHome=function(req, res){
    return res.render('employee/emphome');
}

async function getEmployeeId(user) {
  if (user) {
    const employee = await Employee.findOne({ email: user.email });
    if (employee) {
      return employee._id;
    }
  }
  return null; // Return null if the user or employee is not found
}


module.exports.viewPerformanceReviews=async function(req, res){

    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      const employee = await Employee.findOne({ email: user.email });
      if (employee) {
        console.log("employee Id", employee.id);
         let perPage=12;
         let page=req.query.page||1;
         try {
             const performanceReviews = await PerformanceReview.find({ employeeid: employee.id
            }).sort({ updatedAt: -1 })
               .skip(perPage * page - perPage)
               .limit(perPage)
               .exec();
                const count=await PerformanceReview.count();
                return res.render('employee/performancereviews', {
                  performanceReviews,
                  title: "performance reviews",
                  current: page,
                  formatCreatedAt,
                  pages: Math.ceil(count/perPage)
             });
      } catch (error) {
        console.log('Error:', error);
      }}else {
        console.log('Employee not found');
      }} else {
      // User not found
      console.log('User not found');
    }
  

}

module.exports.submitEmployeeFeedback= async function(req, res){
          
   console.log("Submit Employee Feedback :", req.body);
   console.log("Submit Employee Feedback :", req.body.feedbackid);

   await PerformanceReview.findOneAndUpdate({
    _id: req.body.feedbackid,
    employeeid: req.body.employeeid,
    feedbackstatus: "Pending",
    reviewerid: req.body.reviewerid
  }, {
    employeefeedback: req.body.employeefeedback,
    feedbackstatus: "Submitted",
    updatedAt: Date.now()
 });

    res.redirect(`/employee/viewreviews/${req.user.id}`);

}


module.exports.viewReviewRequest=async function(req, res){

  const user = await User.findOne({ _id: req.params.id });
  const employeeid=await getEmployeeId(user);
   console.log("Reviewer ID :", req.params.id);
   console.log("Reviewer Employee ID :", employeeid);
   const assignedReviews = await PerformanceReview.find({ 
    $and: [
      { reviewerid: employeeid },
      { feedbackstatus: 'AssignedToReviewer' }
    ]
  }).exec();

       try {
           console.log("view review request controller")
           return res.render('employee/reviewrequest', {
              assignedReviews,
              title: "Review Request"
           });


    } catch (error) {
      console.log('Error:', error);
    }


}


module.exports.submitEmployeeReview= async function(req, res){
          
  const user = await User.findOne({ _id: req.user.id });
  const reviwerid=await getEmployeeId(user);
  await PerformanceReview.findOneAndUpdate({employeeid: req.body.employeeid,
    reviewerid: reviwerid,
    feedbackstatus: "AssignedToReviewer"
  }, {
    reviewdate:req.body.reviewDate,
    performancecriteria:req.body.performanceCriteria,
    feedback:req.body.feedback,
    rating:req.body.rating,
    feedbackstatus: "Pending",
    updatedAt: Date.now()
});

   res.redirect(`/employee/viewreviews/${req.user.id}`);

}


