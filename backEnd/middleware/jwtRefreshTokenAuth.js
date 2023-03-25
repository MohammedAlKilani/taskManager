const jwt = require("jsonwebtoken");
require("dotenv").config()
const userSchema =require("../models/userSchema")
const jwtRefreshTokenAuth = async(req,res,next)=>{
   const jwtToken = req.cookies.jwt
   console.log(req.cookies.jwt)
   console.log(req.cookies)
   
   
   if(!jwtToken)return res.status(404).json({massage:" No found Token"});
   if(!(await userSchema.find({jwtRefreshToken:jwtToken})))return res.status(404).json({massage:" No found RefreshToken"});
   try {

    const userJwt = jwt.verify(jwtToken,process.env.privateKey_Refresh);
   

    const userFind = await userSchema.findById(userJwt._id);
    
    const user ={ 
        _id:userFind._id,
        userName:userFind.userName
          }

        const accessToken= userFind.jwtAccessToken()
      
      return res.json({user,accessToken})

   } catch (error) {
    return res.status(403).json({massage:" forbidden"});
   }
  
   
}
module.exports = jwtRefreshTokenAuth