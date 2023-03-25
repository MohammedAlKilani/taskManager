
import {BrowserRouter,Route,Routes ,Navigate }from "react-router-dom"

import Layout from "./components/Layout";
import Nav from './Nav';
import Main from './Main';

import Task from './Task.js';
import AddTask from "./AddTask.js"
import Signup from "./components/sign/Signup"
import {useContext } from 'react'
import { conText } from './ConText'
import Signin from "./components/sign/Signin";
import SignNavi from "./components/sign/SignNavi";
function App() {
  const {auth,setAuth} = useContext(conText)
 

  return (
    <BrowserRouter>
      
   <Routes>   
  <Route path="/" element={<Layout/>}>
      {!auth.accessToken?<>
        
      <Route path='/' element={<SignNavi/>}/> 
      <Route path='/signup' element={<Signup/>}/> 
       <Route path='/signin' element={<Signin/>}/></> :<>
        <Route index element={<><Nav />
        <Main /></>} />
        <Route path='/:id' element={<Task/>}/>
        <Route path='/add' element={<AddTask/>}/>
      </>}




  
 
</Route>
 </Routes>

    
    
    
    
   
    </BrowserRouter> 
  

  );
}

export default App;
