import React from 'react'
import { faBell, faCalendarPlus, faCheckCircle, faFileAlt, faUserGroup, faUserLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './Sidebar'
import useFetch from '../useFetch';

const AdminHome = () => {
const {Data:user} = useFetch(`http://localhost:5000/adminusers/`)
const {Data:blogs} = useFetch(`http://localhost:5000/adminblogs/`)

  
  return (
    
    <div className='max-w-full mx-auto flex  flex-row'>
<div className='sideBar bg-slate-900 h-screen basis-1/4 hidden md:block sticky'>
<Sidebar />
</div>

<div  className='py-5 px-4  basis-full '>
  <div className='flex flex-wrap flex flex-col md:flex-row justify-between  '>

    <div className='text-white border-1 p-2 bg-blue-600 h-24 w-84 mt-3 md:w-80 shadow-4xl'>
      <span className='float-left  text-white font-semibold text-xl'>{user}</span>
      <span className='float-right text-white font-semibold text-3xl'> <FontAwesomeIcon icon={faUserGroup} /> </span>
      <p className='mt-5 text-center font-monospace font-semibold'>Total Number Of Registered Users</p>
    </div>

    <div className='text-white border-1 p-2 bg-red-600 h-24 w-84 mt-3  md:w-80 shadow-4xl'>
      <span className='float-left  text-white-500 font-semibold text-2xl'>{blogs}</span>
      <span className='float-right text-white-500 font-semibold text-3xl'> <FontAwesomeIcon icon={faFileAlt} /> </span>
      <p className='mt-5 font-semibold font-monospace text-center '>Total Number Of Blogs Posted</p>
    </div>

    <div className='text-white border-1 p-2 bg-green-700 h-24 w-84 mt-3 md:w-80  shadow-4xl'>
      <span className='float-left  text-white font-semibold text-2xl'>0</span>
      <span className='float-right text-white font-semibold text-3xl'> <FontAwesomeIcon icon={faCheckCircle} /> </span>
      <p className='mt-5 text-center font-semibold font-monospace'>Total Number Of Verified Users</p>
    </div>
  </div>

  <div className='flex flex-col md:flex-row justify-between mt-16'>
  
<div className='text-white border-1 p-2 bg-black h-24  w-84 mt-2 md:w-80  shadow-4xl'>
  <span className='float-left  text-white font-semibold text-xl'>0</span>
  <span className='float-right text-white font-semibold text-3xl'> <FontAwesomeIcon icon={faUserLock} /> </span>
  <p className='mt-5 text-center font-semibold font-monsopace'>All Blocked Users</p>
</div>

<div className='text-white border-1 p-2 bg-orange-600  h-24  w-84 mt-2 md:w-80  shadow-4xl'>
<span className='float-left  text-whitefont-semibold text-xl'>0</span>
  <span className='float-right text-white font-semibold text-3xl'> <FontAwesomeIcon icon={faCalendarPlus} /> </span>
  <p className='mt-5 text-center font-semibold font-monospace '>Scheduled & Pending Posts</p>
</div>

<div className='text-white border-1 p-2 bg-indigo-600  h-24  w-84 mt-2 md:w-80  shadow-4xl'>
  <span className='float-left  text-whitefont-semibold text-xl'>0</span>
  <span className='float-right text-white font-semibold text-3xl'> <FontAwesomeIcon icon={faBell} /> </span>
  <p className='mt-5 text-center font-semibold font-monospace '>User Notification & Reports</p>
</div>

</div>
</div>
</div>
   
   
  )
}

export default AdminHome