require('dotenv').config()
const express= require('express')
const cors=require('cors')
const Router =require('./Routers/routs')
require('./Config/database')

////server creation/////// /

const carServer=express();

carServer.use(cors())

carServer.use(express.json())

carServer.use('/uploads',express.static('./uploads'))

carServer.use(Router)

const PORT =3000 || process.env.PORT   

carServer.listen(PORT,()=>{
    console.log(`server running successfully in ${PORT}  and waiting for the client request`);
    
})