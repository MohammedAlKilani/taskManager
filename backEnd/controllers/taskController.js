const taskSchema =require("../models/taskSchema")
const userSchema = require("../models/userSchema")
const addTask=async(req,res,next)=>{
    const newTask ={user:req.user._id,
        taskName:req.body.task.taskName,
        complete:req.body.task.complete, }
        console.log(req.body.task)

    try{

        const addTask = await taskSchema.create(newTask);
        await userSchema.findOneAndUpdate(addTask.user,{$push:{tasks:addTask._id}})
       
         console.log(addTask)
              res.json(addTask)
             
    }catch(err){
        next(err)
    }
    
}

const allTask =async(req,res,next)=>{
    try {
        const all =await taskSchema.find({user:req.user._id})
    
    res.json(all)

    } catch (error) {
        next(error)
    }
    
}

const findTask = async(req,res)=>{
    console.log(req.params.taskip)
    const find =await taskSchema.findById(req.params.taskip)
    res.json(find)

}
const updateTask =async (req,res)=>{
    
    const update = await taskSchema.findByIdAndUpdate(req.params.taskip,req.body,{new:true})

    console.log(update)
    res.json(update)
}

const deleteTask =async(req,res)=>{
    const delet = await taskSchema.findByIdAndDelete(req.params.taskip)
     res.json(delet)


}





module.exports={
    addTask,
    allTask,
    findTask,
    updateTask,
    deleteTask
    

}
