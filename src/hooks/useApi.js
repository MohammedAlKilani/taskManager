import {useContext} from 'react'
import axios from 'axios';
import  {conText}  from '../ConText';

const useApi = () => {
  axios.defaults.withCredentials = true;

    const {auth} = useContext(conText) 

  
 const url = "http://127.0.0.1:3500";
const api =()=> axios.create(
        {baseURL:url}
    )


 
  return {api}
}

export default useApi