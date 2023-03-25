const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"userSchema"},
    taskName: {
        type:String, 
        require:true,
        
        
    },
    complete:{
        type:Boolean, 
        require:true
    },
})



module.exports=mongoose.model("taskSchema",taskSchema)