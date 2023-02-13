const express =require("express")
const router =express.Router()
const {add_task,all_task,find_task,update_task,delete_task} =require("../controllers/task")

router.route("/").get(all_task).post(add_task)

router.route("/:taskip").get(find_task).patch(update_task).delete(delete_task)

module.exports=router