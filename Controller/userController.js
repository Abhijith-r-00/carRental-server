const jwt=require('jsonwebtoken')
const users=require('../Models/userModel')
exports.registerController=async(req,res)=>{
    const {fullName,email,password,licenseNumber,userType}=req.body;
    try {
        const isUserAlreadyExists=await users.findOne({email})
        if(isUserAlreadyExists){
            res.status(409).json("UserAlready Exists!")
        }else{
            const newUser=new users({fullName,email,password,licenseNumber,userType})
            await newUser.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}


exports.loginController=async(req,res)=>{
    const {email,password}=req.body
    try {
        if(email=='admin@gmail.com'&& password=='admin123'){
            res.status(200).json({type:'admin'})
        }
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},process.env.JWTSECRETKEY)
            res.status(200).json({user:existingUser,token:token})
           
        }else{
            res.status(401).json({message:"Invalid username/password"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}
