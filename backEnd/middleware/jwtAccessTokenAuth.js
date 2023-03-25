const jwt = require("jsonwebtoken");
require("dotenv").config()
const jwtAccessTokenAth =(req,res,next)=>{
    const authHeader = req.headers.authorization
     console.log(req.headers.authorization) 

    const [bearer,jwtToken] = authHeader.split(" ")

    if(!(bearer==="Bearer")) return res.status(404).json({massage:" not found Bearer"});
    try {
       const userJwt = jwt.verify(jwtToken,process.env.privateKey_Access)
       
        req.user={_id:userJwt._id};
   
         next()
         return
    } catch (error) {
        return res.status(403).json({massage:"forbidden"});
    }
    
   


}
module.exports = jwtAccessTokenAth