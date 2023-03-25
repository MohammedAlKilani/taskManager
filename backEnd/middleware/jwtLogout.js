const userSchema =require("../models/userSchema")
const jwt = require("jsonwebtoken");
require("dotenv").config()

const jwtLogout = async(req,res,next)=>{
    
    
    if(!(req.cookies?.jwt))return res.status(404).json({massage:" No found RefreshToken"});

    try {
        const jwtToken = req.cookies.jwt;console.log(process.env.privateKey_Refresh)
    const userJwt = jwt.verify(jwtToken,process.env.privateKey_Refresh);
   
    
    const userFind = await userSchema.findById(userJwt._id);
    
    console.log(await userSchema.findByIdAndUpdate({_id:userFind._id},{jwtRefreshToken:""})) 
      
      res.clearCookie("jwt",{httpOnly:true});
     return res.status(204).end("gfch");
   } catch (error) {
    console.log(error)
   }
   
}

  
module.exports = jwtLogout