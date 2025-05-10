const express=require('express')
const userController=require('../Controller/userController')
const jwtMiddleware=require('../Middleware/jwtMiddleWare')

const router= new express.Router();

router.post('/register',userController.registerController);

router.post('/login',userController.loginController);


module.exports=router;