import {createContext,useEffect,useState} from 'react'
import useApi from './hooks/useApi'; 
import useAuth from "./hooks/useAuth.js"
export const conText = createContext({});

export const ConTextData = ({children}) => {
  const [auth,setAuth]=useState(JSON.parse(localStorage.getItem("auth"))||{});
    
    const [search,setSearch]=useState("");
   
      const {api} = useApi()
    const [tasksServer,setTasksServer]=useState([])
    const [tasks,setTasks]=useState([])
    

    useEffect(()=>{
      if(auth.accessToken){
        localStorage.setItem("auth",JSON.stringify(auth));}
      
    },[auth])


    

  return (
    <conText.Provider value={{search, setSearch , tasksServer,setTasksServer,tasks ,setTasks ,api ,auth,setAuth }}>

        {children}


    </conText.Provider>
    
  )
}

