import React,{useState, useEffect} from 'react'
import { Divider, Result } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import useFetch from './useFetch'
import { faArrowLeft, faCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

const BlogDetails = () => {
  const PF = "http://localhost:5000/images/"
  const [value, setValue] = React.useState('');
    const {id} = useParams()
    const{Data:blog,loading,error} = useFetch(`http://localhost:5000/blogs/user/${id}`)

  
    const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='max-w-3xl mx-auto shadow-lg  p-3 px-4 bg-gray-100 mt-10'>
         {/*when fetching is loading */}
      {loading && <div className='mx-auto max-w-sm text-center mt-10'><CircularProgress /></div> }
     {/*when there is an error */}
      {error && <div className=''>
      <Result
    status="404"
    title="404"
    subTitle="Sorry, The Page you Visited Does Not Exist"
    extra={<Link to='/' className='p-2 text-white bg-blue-400'><FontAwesomeIcon icon={faArrowLeft} /> Back Home </Link>}
  />
        </div>}

        {blog && 
           <div> 
             <div className='flex justify-between'>
             <span className='float-left  text-white bg-gray-800 p-1 rounded-md'>{new Date (blog.createAt).toDateString()}</span>
             <span className=''> <FontAwesomeIcon icon={faCheck} className='text-white text-2xl p-1 bg-green-500 rounded-full shadow-2xl' /> </span>
             <span className='float-right text-white bg-violet-900 p-2 rounded-md'>Author</span>
             </div>
             <br /><br/>
            <span className='text-center ml-5 font-bold text-3xl'>{blog.title}</span> 
           <Divider></Divider>
           {blog.blogImage && <div className=''> <img src={PF + blog.blogImage} className="h-52 w-full rounded-lg object-center object-cover" alt="blog Image"/></div>}
           <div className='mt-3 mb-10'><span>{blog.body}</span></div>
           <span className='py-1 text-center mt-10 px-3 bg-blue-400 text-xl text-white rounded-full cursor-pointer' onClick={()=>navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></span> 
           </div>
            
        }

    {blog && <div className='mt-10'>
     <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Bookmark" icon={<BookmarkBorderOutlinedIcon />} />
        <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Comment" icon={<ChatBubbleOutlineIcon />} />
       
       <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SendOutlinedIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
       
      </BottomNavigation>
     </div>}
        
        </div>
    </div>
  )
}

export default BlogDetails