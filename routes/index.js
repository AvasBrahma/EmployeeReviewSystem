const express=require('express');
const router=express.Router();

const adminController=require('../controllers/admin_controller');
const homeController=require('../controllers/home_controller');


router.get('/create-account', homeController.createAccount);
router.get('/', homeController.login);

module.exports=router;