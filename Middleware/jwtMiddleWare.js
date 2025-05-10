const jwt=require('jsonwebtoken')
const jsonverify=(req,res,next)=>{
    if(req.header['authorization']){
        try{
                const token=req.header['authorization'].split(' ')[1]
                const jwtResponse=jwt.verify(token,process.env.JWTSECRETKEY)
                const userId=jwtResponse.userId
                next()
        }catch (error) {
            res.status(403).json("Please provide a valid token!")
        }
    }else{
        res.status(401).json("Please Login to Continue!")
    }
}
module.exports=jsonverify;