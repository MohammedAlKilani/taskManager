const express = require("express")
const app = express()
const mongoose = require("mongoose")
const task_routes =require("./routes/task_routes")

const port = 3000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world")
})
mongoose.set('strictQuery', true);



app.use("/task",task_routes)

const go = async ()=>{
    try{
    await mongoose.connect("mongodb://127.0.0.1/task",
    ()=>{console.log("port")},
    app.listen(port,()=>{console.log(port)}))
}catch(e){

    console.log(e)
 }
}

go()