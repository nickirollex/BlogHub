import React,{useState} from 'react'
import Sidebar from './Sidebar'
import { Result} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const Members = () => {
  const{Data:users,loading,error} = useFetch(`http://localhost:5000/adminusers/search`)
  const [searchTerms, setSearchTerms] = useState('')
  return (
    
    <div className='max-w-full mx-auto flex  flex-row'>
<div className='sideBar bg-slate-900 max-h-full basis-1/4 hidden md:block sticky'>
<Sidebar />
</div>

<div  className=' shadow-4xl h-screen  basis-full '>
<div className='p-7 bg-gray-300 shadow-4xl'>
<div className='mx-auto max-w-lg relative flex items-center'>
    <FontAwesomeIcon icon={faSearch} className='absolute ml-3 float-right  text-lg' />
    <input type='text' 
     placeholder='Filter & Search By User Name Or Email Address .....'
      className='w-full  py-3 px-10 font-monospace rounded-full focus:outline-none'
      value={searchTerms}
      onChange={e=>setSearchTerms(e.target.value)}
      />
</div>
</div>
{loading && <div className='mx-auto max-w-sm text-center mt-10'><CircularProgress /></div> }
{error && 
  <Result
    status="500"
    title={error}
  />
}
<div>
{users &&
  <div className=' p-8 shadow-2xl overflow-y-scroll  max-h-full max-w-full mx-auto rounded-xl'> 
  <div className="table-responsive-sm">
           <table className="table table-striped table-hover" style={{fontFamily:'sans-serif', color:'#595959', fontSize:'15px'}}>
          <thead>
            <tr>
             
              <th>Name</th>
              <th>User ID</th>
              <th>Email Address</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
           <tbody>
            {
              users.map(user =>
                <tr key={user._id}>
                  <td><Link to={`/memberdetails/${user._id}`} className="text-info text-decoration-none">{user.name}</Link></td>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{new Date (user.date).toDateString()}</td>
               <td>{user.verified ? <FontAwesomeIcon icon={faCheck} className='bg-green-700 p-1 rounded-full text-white'/> : <span>-</span>}</td>
               </tr>
                )
            }
           
           </tbody>
          
         </table>
         </div>
</div>
  }
</div>
</div>
</div>
   
   
  )
}

export default Members