import React from 'react'
import AllTask from './AllTask'
import useApiAuth from "./hooks/useApiAuth"
import {useEffect ,useContext} from 'react'
  import { conText } from './ConText'
import { Link } from 'react-router-dom'
const Main = () => {
  const apiAuth = useApiAuth()

  const {tasks,setTasks,tasksServer,setTasksServer,search,auth ,api,setAuth} = useContext(conText)
 
    useEffect(()=>{
  
     
      const getAllTask =async()=>{
             try {
              const AllTask= await apiAuth.get('/task');

  
              setTasksServer(AllTask.data)
              
             } catch (error) {
              if(error?.response){
                 console.log(error.response.data)
                 console.log(error.response.status)
                 if(error?.response?.status === 403){
                  setAuth(()=>{})
                  
                 }
                return 
              }
              console.log(error?.message)
             } 
          
      }
  
  
      getAllTask()    
  },[]);
  useEffect(()=>{
       setTasks(tasksServer)
  },[tasksServer])
  
  useEffect(()=>{
    
      if(search){
        
          const reseachArray =()=>tasksServer.filter(task => task.taskName.toLowerCase().includes(search.toLowerCase()) );
          
       setTasks(reseachArray)
     
      }else{setTasks(tasksServer)}
      
  
       
  },[search])

    
   

  return (
    <main className='relative min-h-[94vh] flex flex-col bg-slate-900 w-3/4 m-auto gap-2 text-white text-center ' >
        All task for {auth?.user?.userName }
    {tasks[0]? tasks.map((task,i)=>(<AllTask task={task} key={task._id} />)):<span className='text-3xl'>No task go to play</span>}

    <div className='absolute bottom-0 -left-7 bg-stone-600 rounded-full w-11 h-11 text-center pt-2 hover:-translate-y-1'><Link to="/add">Add </Link></div>

    
    </main>
  )
}

export default Main