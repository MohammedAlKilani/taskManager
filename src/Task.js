import {useContext, useEffect, useState} from 'react'
import { Link, useParams ,useNavigate } from 'react-router-dom' 
import { conText } from './ConText'
import useApiAuth from "./hooks/useApiAuth"

const Task = () => {
  const navigate = useNavigate()
const apiAuth = useApiAuth()
    const {tasks , taskServer ,setTasks} =useContext(conText)
    const {id} = useParams()

const [task,setTask] = useState(tasks.filter((e)=> e._id===id)[0])
     
    
    const deletNewTask = async (e)=>{
      e.preventDefault()
        try {
          await apiAuth.delete(`/task/${task._id}`)
          const newTasks = tasks.filter((e)=>e._id!=task._id )

           setTasks(newTasks)
          
           navigate("/")
        } catch (error) {
          console.log(error)
        }
        
    
    }

    const taskChecked = async (e)=>{
      e.preventDefault()

       const newTasks = tasks.map((e)=>e._id==task._id ?{...e,complete:!task.complete }:e)

       setTasks(newTasks)
      
        
     
      try {
         await apiAuth.patch(`/task/${task._id}`,{"complete": !task.complete})
         setTask((task)=> {return {...task,complete:!task.complete}})
       } catch (error) {
         console.log(error)
       }
       
     }
    
    

  
    
    

  return (
<main className='min-h-[94vh]  justify-center text-5xl bg-orange-800 w-3/4 m-auto gap-2'>
{task.taskName }  

    <input type='checkbox' checked={task.complete} onClick={(e)=>taskChecked(e)}  />

    
   <input type='button' value={"Delete"} onClick={(e)=>deletNewTask(e)} className='cursor-pointer block bg-red-900 w-fit m-auto w-full'/>
  </main>
  )

   
    
}

export default Task