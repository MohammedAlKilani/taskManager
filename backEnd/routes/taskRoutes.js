const express =require("express")
const router =express.Router()
const  {taskValidator,validat}=require("../middleware/validator")

const {addTask,allTask,findTask,updateTask,deleteTask} =require("../controllers/taskController")

router.route("/").get(allTask).post(addTask)

router.route("/:taskip").get(findTask).patch(updateTask).delete(deleteTask)

module.exports=router