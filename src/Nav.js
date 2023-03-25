import {conText} from './ConText'
import {useContext} from 'react'
import useApiAuth from "./hooks/useApiAuth"

 
const Nav = () => {
  const {auth,setAuth} = useContext(conText)
  const ApiAuth = useApiAuth()
  const {search,setSearch} =useContext(conText) 
  const logout = async()=>{
    await ApiAuth.get("logout")
    setAuth({})
    localStorage.clear("auth")
    

  }
  return (
    <nav className='bg-slate-700 w-3/4 m-auto flex flex-row justify-between' > 
    <input type='text'className='rounded-md  ' placeholder='Search' value={search} onChange={e =>setSearch(e.target.value)}/>
    
    <input type='button' value={"logout"} className='cursor-pointer'onClick={logout}/> 
    </nav>
  )
}

export default Nav