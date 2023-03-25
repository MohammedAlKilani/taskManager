import React from 'react'
import {conText} from "../ConText"
import { useContext } from 'react'
import {Outlet,Navigate ,Link} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
const Layout = () => {

    // const {tasks } =useContext(conText);
  return (
    <div>
     <Link to="/"><Header/></Link>  
    <Outlet /> 
    <Footer/>
    </div>
  )
}

export default Layout