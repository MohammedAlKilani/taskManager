import {useContext, useState} from 'react'
import { conText } from './ConText'
import useApiAuth from "./hooks/useApiAuth"
import {useNavigate}from "react-router-dom"

const AddTask = () => {
  const apiAuth = useApiAuth()
  const navigate = useNavigate()
  const {api , tasks ,setTasks,auth} = useContext(conText)
  const [newTask , setNewTask] = useState("")
  
  const postNewTask = async (e)=>{
    e.preventDefault()
    
    if(!newTask==""){try {
      
      
      const req = await apiAuth.post("/task",{
        "task":{
          "taskName": String(newTask) ,
        "complete": false}
        
      })

      navigate("/")

   
    } catch (error) {
      console.log(error)
    }}
    
  }

  return (

    <div className='bg-slate-900 w-3/4  h-screen flex items-center justify-center  m-auto '><form className="flex gap-3"> <input type='text' placeholder='new task' value={newTask} onChange={(e)=>setNewTask(()=>e.target.value)} required /> 
    <input type='submit' onClick={(e)=>postNewTask(e)} value={"Add new Task"} className='cursor-pointer bg-slate-500 rounded-lg'/> 

    </form></div>
    
  )
}

export default AddTask