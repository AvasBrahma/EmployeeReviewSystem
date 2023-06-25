const express=require('express');
const router=express.Router();
const passport=require('passport');


const adminController=require('../controllers/admin_controller');


router.get('/create-account', adminController.createAccount);
router.post('/create-account', adminController.addAccount);


router.get('/', adminController.adminHome);
router.get('/viewallemployees', adminController.viewAllEmployees);
router.get('/viewallReviews', adminController.viewAllReviews);
router.get('/viewemployee/:id', adminController.viewEmployee);
router.get('/viewAssignedReview', adminController.viewAssignedEmployee);

router.post('/create-review/:id', adminController.addReview);


module.exports=router;
