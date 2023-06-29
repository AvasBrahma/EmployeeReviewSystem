const express=require('express');
const router=express.Router();
const passport=require('passport');


const empController=require('../controllers/employee_controller');



router.get('/', empController.empHome);

router.put('/submitfeedback', empController.submitEmployeeFeedback);

router.get('/viewreviews/:id', empController.viewPerformanceReviews);

router.get('/reviewrequest/:id', empController.viewReviewRequest);

router.put('/addreview', empController.submitEmployeeReview);





module.exports=router;
