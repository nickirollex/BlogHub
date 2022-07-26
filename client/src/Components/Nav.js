import React,{useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faCheck, faFile, faFilePdf, faLineChart, faTools, faUsers } from '@fortawesome/free-solid-svg-icons'

import { Link, useLocation } from 'react-router-dom';
import Account from './Account';
import {  Drawer } from 'antd';

const Nav = () => {
  const [Data, setData] = useState({})
  const location = useLocation()

  useEffect(() => {
    const res = JSON.parse(sessionStorage.getItem("user"))
    setData(res)
  }, [])

  ////////////////////////////////////////////
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  
  return (
    <div className='relative'>
        <AppBar sx={{backgroundColor: 'black'}} position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h3> <a href='/' className='text-4xl text-white font-bold'>BlogHub </a> <FontAwesomeIcon icon={faBell} size="lg" className='text-white'/></h3>
          </Typography>
         {location.pathname === '/' && <div>
         {Data ?
           <Account />:
        <Link to='/login' 
        className='border-white bg-black text-white border-1 py-2 px-9 rounded-2xl'> 
        <span>Login <FontAwesomeIcon icon={faSignIn} /></span> 
        </Link>
        
        }
         </div>
         
         }
         {location.pathname === '/dashboard' &&  <Account />}

         {/**Admin */}
         {location.pathname === '/admin' &&  <div className=' md:hidden'><MenuIcon className='cursor-pointer' onClick={e=>setVisible(!visible)}/></div>}
          {location.pathname === '/members' &&  <div className=' md:hidden'><MenuIcon className='cursor-pointer' onClick={e=>setVisible(!visible)}/></div>}
          {location.pathname === '/adminblogs' &&  <div className=' md:hidden'><MenuIcon className='cursor-pointer' onClick={e=>setVisible(!visible)}/></div>}
          {location.pathname === '/verification' &&  <div className=' md:hidden'><MenuIcon className='cursor-pointer' onClick={e=>setVisible(!visible)}/></div>}
          {location.pathname === '/schedular' &&  <div className=' md:hidden'><MenuIcon className='cursor-pointer' onClick={e=>setVisible(!visible)}/></div>}
          {location.pathname === '/report' &&  <div className=' md:hidden'><MenuIcon className='cursor-pointer' onClick={e=>setVisible(!visible)}/></div>}
          {location.pathname === '/adminsettings' &&  <div className=' md:hidden'><MenuIcon className='cursor-pointer' onClick={e=>setVisible(!visible)}/></div>}

         <Drawer 
         title="Basic Drawer" 
         placement="right" 
         onClose={onClose} visible={visible}
         width='270'
         
         >
        <div className=''>
        <div className='ml-2 mt-16  flex flex-column'>
      <Link to='/admin' className='text-slate-900 font-semibold ' onClick={e=>setVisible(false)} ><FontAwesomeIcon icon={faLineChart} className='mr-3 text-xl bg-slate-800 text-white p-1 rounded-full'/> <span className='text-lg'>Gerneral Dashboard</span> </Link>
      <Link to='/members' className='text-slate-900 font-semibold mt-4 'onClick={e=>setVisible(false)} ><FontAwesomeIcon icon={faUsers} className='mr-3 text-xl  bg-slate-800 text-white p-1 rounded-full'/> <span className='text-lg'>Members</span> </Link>
      <Link to='/adminblogs' className='text-slate-900 font-semibold mt-4 ' onClick={e=>setVisible(false)}><FontAwesomeIcon icon={faFile} className='mr-3 text-xl  bg-slate-800 text-white p-1 rounded-full'/> <span className='text-lg'>Blogs</span> </Link>
      <Link to='/verification' className='text-slate-900 font-semibold mt-4 ' onClick={e=>setVisible(false)}><FontAwesomeIcon icon={faCheck} className='mr-3 text-xl  bg-slate-800 text-white p-1 rounded-full'/> <span className='text-lg'>Verification</span> </Link>
      <Link to='/schedular' className='text-slate-900 font-semibold mt-4 ' onClick={e=>setVisible(false)}><FontAwesomeIcon icon={faCalendar} className='mr-3 text-xl  bg-slate-800 text-white p-1 rounded-full'/> <span className='text-lg'>Task Schedular</span> </Link>
      <Link to='/report' className='text-slate-900 font-semibold mt-4 ' onClick={e=>setVisible(false)}><FontAwesomeIcon icon={faFilePdf} className='mr-3 text-xl  bg-slate-800 text-white p-1 rounded-full'/> <span className='text-lg'>External Reports</span> </Link>
      <Link to='/adminsettings' className='text-slate-900 font-semibold mt-4 ' onClick={e=>setVisible(false)}><FontAwesomeIcon icon={faTools} className='mr-3 text-xl  bg-slate-800 text-white p-1 rounded-full'/> <span className='text-lg'>Settings</span> </Link>

        </div>
      </div>
      </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav