const mongoose = require("mongoose")


const task_schema = new mongoose.Schema({
    task_name: {
        type:String, 
        require:true
    },
    complete:{
        type:Boolean, 
        require:true
    },
})



module.exports=mongoose.model("task_schema",task_schema)