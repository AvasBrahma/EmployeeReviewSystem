const express=require('express');
const router=express.Router();
const passport=require('passport');


const empController=require('../controllers/employee_controller');



router.get('/', empController.empHome);

router.put('/submitfeedback', empController.submitEmployeeFeedback);

router.get('/viewreviews/:id', empController.viewPerformanceReviews);

router.get('/reviewrequest', empController.viewReviewRequest);


module.exports=router;
