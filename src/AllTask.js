

import { Link } from 'react-router-dom';
const AllTask = ({task,setSearch}) => {

let bgTask;
    task.complete?bgTask="bg-green-400" : bgTask="bg-red-600";
    
  return (
    <Link to={`/${task._id}`}><div className={`${bgTask} text-center text-xl rounded-md w-1/2 mx-auto origin-bottom animate-from-botton text-black`}> <h3>{task.taskName}</h3> </div></Link>
  )
}

export default AllTask