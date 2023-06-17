const express=require('express');
const router=express.Router();
const passport=require('passport');

const adminController=require('../controllers/admin_controller');
const homeController=require('../controllers/home_controller');



console.log('Routes called....!!');
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/'
    }
) , homeController.createSession);



router.get('/create-account', homeController.createAccount);
router.post('/create-account', homeController.addAccount);
router.get('/sign-in', homeController.signIn);
router.get('/', homeController.home);

router.use('/admin',require('./admin'));


module.exports=router;