const cookie = require("cookie-parser")
const express = require("express")
const app = express()
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const errorHandler = require("./middleware/errorHandler")
const mongoose = require("mongoose");
process.on("uncaughtException",err=>{
    console.log(`Error ${err.name} : ${err.message} path ${err.stack}`)
   
        process.exit(1)
   

})

const port = 3500;
mongoose.set('strictQuery', true);


// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Methods",true)
//     next()
// })
const corsConfig = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors({
    origin: true,
    credentials: true,
  }));
  app.options('*', cors(corsConfig)) 

  
app.use(helmet());
app.use(xss());
app.use(express.json());

app.use(cookie())
app.use((req,res,next)=>{
    
    console.log(req.cookies) 
    console.log(req.method) 
    next()
})



app.use("/",require("./routes/signUpIn"))
app.use("/refersh",require("./middleware/jwtRefreshTokenAuth"))



app.use(require("./middleware/jwtAccessTokenAuth"))
app.use("/logout",require("./middleware/jwtLogout"))

app.use("/task",require("./routes/taskRoutes"))



app.use(errorHandler);



     mongoose.connect("mongodb://127.0.0.1/task",()=>{console.log(`mongodb://127.0.0.1/task`)})


  const server = app.listen(port,()=>{console.log(`app run in ${port}`)})


process.on("unhandledRejection",err=>{
    console.log(`Error ${err.name} : ${err.message}`)
    server.close()

})