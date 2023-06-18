const express=require('express');
const router=express.Router();
const passport=require('passport');


const empController=require('../controllers/employee_controller');



router.get('/', empController.empHome);

router.get('/viewreviews', empController.viewPerformanceReviews);




module.exports=router;
