const Admin=require('../models/admin');
const User=require('../models/user');
const Employee=require('../models/employee');
const PerformanceReview=require('../models/performancereviews');

const { formatCreatedAt } = require('../assets/helper/controllerhelper');

module.exports.empHome=function(req, res){
    return res.render('employee/emphome');
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
             const performanceReviews = await PerformanceReview.find({ employee: employee.id }).sort({ updatedAt: -1 })
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