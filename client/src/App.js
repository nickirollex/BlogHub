import {useState,useEffect} from 'react'
import './App.css';
import 'antd/dist/antd.css'; 
import{BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login';
import Register from './Components/Register';
import Nav from './Components/Nav';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './PrivateRoute';
import UnknownRoute from './Components/UnknownRoute';
import MyBlogs from './Components/MyAccount/MyBlogs';
import AddBlog from './Components/MyAccount/AddBlog';
import BlogDetails from './Components/BlogDetails';
import BlogEdit from './Components/MyAccount/BlogEdit';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminHome from './Components/Admin/AdminHome';
import Members from './Components/Admin/Members';
import AdminBlogs from './Components/Admin/AdminBlogs';
import AdminSettings from './Components/Admin/AdminSettings';
import Verification from './Components/Admin/Verification';
import Schedular from './Components/Admin/Schedular';
import Reports from './Components/Admin/Reports';
import MemberDetails from './Components/Admin/MemberDetails';



function App() {
  const [Auth, setAuth] = useState(true)
 useEffect(() => {
  const res = JSON.parse(sessionStorage.getItem("user"))
  setAuth(res)
 }, [])
 
  return (
   
    <div className=''>
         <BrowserRouter>
     <Nav />
     <Routes > 
             <Route path='/' element={<Home />}/> 
             <Route path='/login' element={<Login />}/> 
             <Route path='/register' element={<Register />}/>
             <Route path='/blogdetails/:id' element={<BlogDetails />}/>

             {/**Admin */}
             <Route path='/adminlogin' element={<AdminLogin />}/>
             <Route path='/admin' element={<AdminHome />}/>
             <Route path='/members' element={<Members />}/>
             <Route path='/memberdetails/:id' element={<MemberDetails />}/>
             <Route path='/adminblogs' element={<AdminBlogs />}/>
             <Route path='/verification' element={<Verification />}/>
             <Route path='/schedular' element={<Schedular />}/>
             <Route path='/report' element={<Reports />}/>
             <Route path='/adminsettings' element={<AdminSettings />}/>
             {/**------------------- */}
                 {/**Protected routes */}
              <Route element={<PrivateRoute Auth={Auth}/>} >
             <Route path='/dashboard' element={<Dashboard />}/>
             <Route path='/newblog' element={<AddBlog />}/>
             <Route path='/blogedit/:id' element={<BlogEdit />}/>
             </Route>

              {/**Unknow route */}
             <Route path='*' element={<UnknownRoute />}/> 
             </Routes>
   </BrowserRouter>
    </div>
   
  );
}

export default App;
