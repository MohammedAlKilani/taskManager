const task_schema =require("../models/task")

const add_task=async(req,res)=>{
    console.log(req.body)
    try{

        const add = await task_schema.create(req.body)
             res.json(add)
             console.log(add)
    }catch(err){
        console.log(err)
    }
    
}

const all_task =async(req,res)=>{
    const all =await task_schema.find()
    res.json(all)

}

const find_task = async(req,res)=>{
    console.log(req.params.taskip)
    const find =await task_schema.findById(req.params.taskip)
    res.json(find)

}
const update_task =async (req,res)=>{
    
    const update = await task_schema.findByIdAndUpdate(req.params.taskip,req.body,{new:true})

    
    res.json(update)
}

const delete_task =async(req,res)=>{
    const delet = await task_schema.findByIdAndDelete(req.params.taskip)
    res.json(delet)


}





module.exports={
    add_task,
    all_task,
    find_task,
    update_task,
    delete_task
    

}
