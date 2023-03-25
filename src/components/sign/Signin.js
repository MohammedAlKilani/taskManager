import {useContext ,useState} from 'react'
import {object,string} from "yup"
import {useNavigate}from "react-router-dom"
import { conText } from '../../ConText.js'

 import useApiAuth from "../../hooks/useApiAuth.js"
 import useApi from "../../hooks/useApi.js"

const Signin = () => {
  const navigate =useNavigate()
  const apiAuth = useApiAuth()
  const api = useApi().api()

  
   const {auth,setAuth} = useContext(conText)
  
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState([])
  const newUser = object().shape({
    
    email:string().required().email(),
    password:string().required().max(20).min(5)

  })
  

  const valid =async(e)=>{
    e.preventDefault()
    try {
     
     await newUser.validate({email,password},{abortEarly:false})
      const req = await api.post("/signin",{
        "user":{
    "email":email,
    "password":password}
        
      })
      
      console.log(req.data)
      setAuth(()=>req.data)
      navigate("/")
  
} catch (error) {
  if(error?.response){
    console.log(error?.response?.data)}
  
  if(error.errors){
    setError(error?.errors) 
  }
  console.log(error)

  
}
  }
  



  
  return (
    <div className='bg-slate-900 w-3/4  h-screen flex items-center justify-center gap-1 m-auto flex-col'>
      <div className='w-50 h-32 flex flex-col-reverse gap-3 '>{error.map((err,i)=>(<div key={i} className='bg-red-900 rounded-md text-center'>{err}</div>))}</div>
    <form className='flex flex-col w-1/2 min-w-[300px] mw-auto  bg-neutral-700 max-h-60 gap-2  ' onSubmit={(e)=>valid(e)}>
      
      <label htmlFor='email'className="text-slate-300">email</label>
      <input id="email"  type='email' placeholder="your email" requiredvalue={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor='password'className="text-slate-300">password</label>
      <input id="password" type='password' placeholder="your password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <input  type='submit'className="text-slate-400 cursor-pointer bg-black w-1/4 m-auto mb-3"/>
    </form>
      
    </div>
  )
}



export default Signin