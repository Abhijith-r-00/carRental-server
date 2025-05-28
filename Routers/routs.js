const express=require('express')
const userController=require('../Controller/userController')
const jwtMiddleware=require('../Middleware/jwtMiddleWare')
const vehicleController=require('../Controller/vehicleController')
const router= new express.Router();
const multerMiddleware=require('../Middleware/multerMiddleware')
const bookingController=require('../Controller/bookingController')
router.post('/register',userController.registerController);

router.post('/login',userController.loginController);

router.post('/addVehicle',jwtMiddleware,multerMiddleware.single('image'),vehicleController.addVehicle)

router.get('/getAllvehicle',jwtMiddleware,vehicleController.getVehicleList)

router.delete('/deleteVehicle/:id',jwtMiddleware,vehicleController.deleteVehicle)

router.get('/getAvailableVehicle',jwtMiddleware,vehicleController.getVehiclesByLocation)

router.post('/addBooking',jwtMiddleware,bookingController.addBooking)
module.exports=router;