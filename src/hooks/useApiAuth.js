import {useContext , useEffect} from 'react'
import axios from 'axios';
import  {conText}  from '../ConText';


import useApi from "./useApi.js"

const useApiAuth = () => {
const api = useApi().api()
const {auth,setAuth} = useContext(conText) 
const url = "http://127.0.0.1:3500";

    const apiAuth =  axios.create(
        {baseURL:url ,headers: {withCredentials:true,
          "Content-Type":"application/json",
          
               Authorization: `Bearer ${auth?.accessToken}`}
           
        }
    )
useEffect(()=>{
     const responseInterceptors = apiAuth.interceptors.response.use(response=>{
        
        return response},async (error)=>{
            
        const prevRequest =   error?.config ;
        if(error?.response?.status === 403 && !prevRequest?.sent ){
            prevRequest.sent =true;
            

            const accessToken =  await api.get("/refersh"  ,{withCredentials: true});
            
            setAuth(()=>accessToken.data)

            prevRequest.headers["Authorization"] = `Bearer ${accessToken.data.accessToken}`

              
            
            return apiAuth(prevRequest) ;
        }
        return Promise.reject(error)
       
        
    })
    return ()=>{
        apiAuth.interceptors.response.eject(responseInterceptors)
    }
},[])

  return apiAuth
}

export default useApiAuth