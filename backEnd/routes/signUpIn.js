const router =require("express").Router()
const userSchema = require("../models/userSchema");

const  {signUp,signIn}=require("../controllers/userController")
const  {signinValidator,signupValidator,validat}=require("../middleware/validator")


router.route("/").post(async(req,res,next)=>{
     res.json({"masag":"hello world"});
   
     
});
router.route("/signup").post(signupValidator,validat,signUp);
router.route("/signin").post(signinValidator,validat,signIn);



module.exports = router