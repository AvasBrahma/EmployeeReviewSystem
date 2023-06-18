const express=require('express');
const router=express.Router();
const passport=require('passport');


const adminController=require('../controllers/admin_controller');



router.get('/', adminController.adminHome);
router.get('/viewallemployees', adminController.viewAllEmployees);
router.get('/viewemployee', adminController.viewEmployee);
module.exports=router;
