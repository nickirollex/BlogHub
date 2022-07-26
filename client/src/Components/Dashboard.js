import React,{useState, useEffect} from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import MyBlogs from './MyAccount/MyBlogs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSearch} from '@fortawesome/free-solid-svg-icons';


const Dashboard  =  ()=> {
  const PF = "http://localhost:5000/images/"
  const [Data, setData] = useState({})

  //useNavigate
  const navigate = useNavigate()


    useEffect(() => {
       
            const res = JSON.parse(sessionStorage.getItem("user"))
            setData(res)
            
        
      
    }, [])
    
  return (
  <>
    <div className=' p-3 px-4 bg-gray-100 shadow-lg'>
      <div  className='text-2xl mt-1 text-center text-white font-mono'> <h1>{Data.name} {Data.verified && <span className=''> <FontAwesomeIcon icon={faCheck} className='text-white text-sm p-1 bg-green-700 rounded-full shadow-lg' /> </span>}</h1></div>
      <div className='text-center mb' >
      <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 16, right: 16 }}
>
        <Link to='/newblog'><AddIcon /></Link>
      </Fab>
      </div>
        </div>
              
        <div className='mt-10'>
         {/* Myblog component */}
         <MyBlogs _id={Data._id}/>
    </div>
  
  </>
  )
}

export default Dashboard