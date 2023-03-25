
const handlerCastError =(err)=>{
    error.message=`invalid ${err.path} : ${err.value} `
    error.statusCode=400
    return error
}
const handlerDuplicatedbError =(err)=>{
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    error.message=`Duplicate value ${value} please use another value `
    error.statusCode=400
    return error
}
const handlerValidationError =(err)=>{
    const errValueArray = Object.values(err.errors.match(err => err.message))
    error.message=`invalid data ${errValueArray.join(" , ")}`
    error.statusCode=400
    return error
}




errorHandler=(err,req,res,next)=>{
    let error = {...err};
    error.message = "error is server"
    error.statusCode = 500 
    if(err.name ==="CastError"){error=handlerCastError(err)}
    if(err.code ===11000){error=handlerDuplicatedbError(err)}
    if(err.name ==="ValidationError"){error=handlerValidationError(err)}
    
   console.log(err)
    return res.status(error.statusCode).json({error:error.message})
    
}
module.exports = errorHandler