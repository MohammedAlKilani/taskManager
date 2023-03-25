const userSchema = require("../models/userSchema");



const signUp = async (req,res)=>{
   const  newUser = req.body.user
   if(await userSchema.findOne({email:newUser.email}))return res.status(401).json({message : "email is used"})
   try {
    const userCreat = await userSchema.create(newUser);
    const accessToken = await userCreat.jwtAccessToken()
      
    
     res.cookie("jwt",userCreat.jwtRefreshToken,{httpOnly:true,sameSite:"None",secure:true , maxAge:1000*60*60*24});
     const user ={ 
      _id:userCreat._id,
      userName:userCreat.userName
        }
    return res.status(201).json({user,accessToken})
   } catch (error) {
    console.log(error);
    return res.json({error});
   }
 
    

}
const signIn = async (req,res,next)=>{
   const  userEmail = req.body.user.email
   console.log(userEmail)
   const userPassword = req.body.user.password
   
   try {
      
    const userFind = await userSchema.findOne({email:userEmail});
    if(!userFind) return res.status(404).json({error:"Email not found"})
    if(!(await userFind.comparePassword(userPassword))) return res.status(401).json({error:"password is wrong"})
    const accessToken= await userFind.jwtAccessToken()
    const refershToken= await userFind.jwtRefershToken()
    console.log(refershToken)
  
    await userSchema.findByIdAndUpdate({_id:userFind._id},{jwtRefreshToken:refershToken})
    const user ={ 
      _id:userFind._id,
      userName:userFind.userName
        }

   res.cookie("jwt",refershToken,{httpOnly:true ,sameSite:"None",secure:true , maxAge:1000*60*60*24});
    return res.json({user,accessToken,refershToken})
   } catch (error) {
    next(error)
   }
 
    

}


module.exports={signUp,signIn} 

