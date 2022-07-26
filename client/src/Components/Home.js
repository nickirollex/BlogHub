import React,{useEffect, useState} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import useFetch from './useFetch';
import { Button, Result, Row, Col, Skeleton ,BackTop } from 'antd';
import Blog from './Blog';
import InputAdornment from '@mui/material/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchTerms, setSearchTerms] = useState('')
const{Data:blogs,loading,error} = useFetch(`http://localhost:5000/blogs`)
useEffect(() => {
  AOS.init({
      startEvent: 'DOMContentLoaded'
  });
}, [])

  return (
    <div className='container'>
       {blogs && <div className='max-w-3xl mx-auto shadow-lg  p-6 bg-gray-50 mt-10'>
        
       <TextField
       
       InputProps={{
         startAdornment: (
           <InputAdornment position="end">
             <FontAwesomeIcon icon={faSearch} className='text-xl' />
           </InputAdornment>
         ),
       }}
       variant="standard"
       className='w-full'
       value={searchTerms} onChange={e=>setSearchTerms(e.target.value)}
     />
     </div>
     }


   {loading && <div className=' max-w-full p-10 mt-20 flex md:flex-none justify-between'>
    <Skeleton avatar paragraph={{ rows: 6 }} active />
    <Skeleton avatar paragraph={{ rows: 6}} active />
   
     </div>}
     
    {error && <div className='max-w-full mx-auto mt-5 '>
    <Result
    status="500"
    title="500"
    subTitle={error}
    extra={<Link to='/'className='border-slate-500 text-slate-400 border-1 py-2 px-9 rounded-2xl' >Reload</Link>}
  />
             </div>
             
      }

{/* */}

  
      <div className='mt-10'>
      <Row gutter={[16, 16]} >   
          {blogs && blogs.filter((filt)=>{
              if(searchTerms===''){
                return filt
              }else if(
                 filt.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
                 filt.user.toLowerCase().includes(searchTerms.toLowerCase()) ||
                 filt.createAt.toLowerCase().includes(searchTerms.toLowerCase())
              ){
                return filt
              }
             }).map(blog => {
            return (
              <Col md={{ span: 8 }} key={blog._id} className="mb-10 max-h-96 overflow-y-clip bg-gray-100 shadow-4xl ">
              <Blog blog={blog}/>
              </Col>
            );
          })}
        </Row>
      </div>

        <BackTop className='bg-slate-900 rounded-full' />
  </div>

   
  )
}

export default Home