import React,{useState} from 'react'
import { faBarChart, faCalendar, faCheck, faFile, faFilePdf, faLineChart, faTools, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
   <div className='fixed'>
     <div className='ml-4 mt-5  flex flex-col fixed'>
      <Link to='/admin' className='text-white font-semibold ' ><FontAwesomeIcon icon={faLineChart} className='mr-3 text-xl bg-white text-slate-800 p-1 rounded-full'/> <span className='text-lg'>Dashboard</span> </Link>
      <Link to='/members' className='text-white font-semibold mt-4 ' ><FontAwesomeIcon icon={faUsers} className='mr-3 text-xl  bg-white text-slate-800 p-1 rounded-full'/> <span className='text-lg'>Members</span> </Link>
      <Link to='/adminblogs' className='text-white font-semibold mt-4 ' ><FontAwesomeIcon icon={faFile} className='mr-3 text-xl  bg-white text-slate-800 p-1 rounded-full'/> <span className='text-lg'>Blogs</span> </Link>
      <Link to='/verification' className='text-white font-semibold mt-4 ' ><FontAwesomeIcon icon={faCheck} className='mr-3 text-xl  bg-white text-slate-800 p-1 rounded-full'/> <span className='text-lg'>Verification</span> </Link>
      <Link to='/schedular' className='text-white font-semibold mt-4 ' ><FontAwesomeIcon icon={faCalendar} className='mr-3 text-xl  bg-white text-slate-800 p-1 rounded-full'/> <span className='text-lg'>Schedular</span> </Link>
      <Link to='/report' className='text-white font-semibold mt-4 ' ><FontAwesomeIcon icon={faFilePdf} className='mr-3 text-xl  bg-white text-slate-800 p-1 rounded-full'/> <span className='text-lg'>Reports</span> </Link>
      <Link to='/adminsettings' className='text-white font-semibold mt-4 ' ><FontAwesomeIcon icon={faTools} className='mr-3 text-xl  bg-white text-slate-800 p-1 rounded-full'/> <span className='text-lg'>Settings</span> </Link>

        </div>
   </div>
  )
}

export default Sidebar