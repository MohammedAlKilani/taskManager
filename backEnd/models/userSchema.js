const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")
require("dotenv").config()

const userSchema = mongoose.Schema({
    userName:{
        require:true,
        type:String,
    },
     email:{
        require:true,
        type:String,
        unique:true,
    },
    password:{
        requrie:true,
        type:String,

    },
    jwtRefreshToken:{
        type:String,
    },
    tasks:[{type:mongoose.Schema.Types.ObjectId,ref:"taskSchema"}]
    
   
})

userSchema.pre("save",async function(){
     const salt = await bcrypt.genSalt(10);
     const hashPassward = await bcrypt.hash(this.password,salt);
     this.password = hashPassward;
});
userSchema.methods.comparePassword = async function(userPassword){
   
      const compare = await bcrypt.compare(userPassword,this.password);
      return compare;

};
userSchema.pre("save" ,async function(){
      const jwtRefreshToken = jwt.sign({userName:this.userName , _id:this._id},process.env.privateKey_Refresh ,{expiresIn:"1d"})
      this.jwtRefreshToken = jwtRefreshToken
});
userSchema.methods.jwtAccessToken = function(){
    const accessToken = jwt.sign({userName:this.userName, _id:this._id},process.env.privateKey_Access,{expiresIn:"1000s"})
    return accessToken;
};
// for sign in
userSchema.methods.jwtRefershToken = function(){
    const jwtRefreshToken = jwt.sign({userName:this.userName , _id:this._id},process.env.privateKey_Refresh ,{expiresIn:"1d"})
    return jwtRefreshToken
};




module.exports=mongoose.model("userSchema",userSchema);