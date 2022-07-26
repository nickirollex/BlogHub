import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Result ,Alert} from 'antd'
import { useParams,Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import useFetch from '../useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { LinearProgress, TextField } from '@mui/material';
import TextArea from 'antd/lib/input/TextArea';
import { Container } from '@mui/system';

const BlogEdit = () => {
    const {id} = useParams()

    const [blog, setBlog] = useState(null)
    const [blogLoading, setBlogLoading] = useState(true)
    const [blogError, setBlogError] = useState(null)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [user, setUser] = useState('')
    const [Success, setSuccess] = useState('')
    const [Error, setError] = useState(null)
    const [Loading, setLoading] = useState(false)


    useEffect(() => {
      const fetchPost = async () =>{
        try {
          const res = await axios.get(`http://localhost:5000/blogs/user/${id}`)
          setBlog(res.data)
          setBlogLoading(false)
          
          setUser(res.data.user)
          setTitle(res.data.title)
          setBody(res.data.body)
         
        } catch (error) {
          setBlogError(error)
        }
      }
      fetchPost()
    }, [])

       const updateHandler = async (e) =>{
        e.preventDefault()
        try {
          setLoading(true)
          await axios.put(`http://localhost:5000/blogs/${blog._id}`, {title: title, body:body, user:user})
           setSuccess('Blog Updated Successfully')
           setLoading(false)
           setError('')
        } catch (error) {
          setLoading(false)
          setSuccess('')
          setError(error)

        }
       }
  return (
    <div className='container'>
        <div className='max-w-3xl mx-auto shadow-lg  p-3 px-4 bg-gray-100 mt-10'>
         {/*when fetching is loading */}
      {blogLoading && <div className='mx-auto max-w-sm text-center mt-10'><CircularProgress /></div> }
       {/*when there is an error */}
      {blogError && <div className=''>
      <Result
    status="404"
    title="404"
    subTitle="Sorry, The Page you Visited Does Not Exist"
    extra={<Link to='/dashboard' className='p-2 text-white bg-blue-400'><FontAwesomeIcon icon={faArrowLeft} /> Back To Dashboard </Link>}
  />
        </div>}

        {blog &&
        <Container maxWidth="xl">
        <div className='mx-auto mt-2 max-w-2xl'>
        {Success && <Alert
        message={Success}
        type="success"
        showIcon
        closable 
      />}
        {Error && <Alert
        message={Error}
        type="error"
        showIcon
        closable
        className='p-3 font-monospace' 
      />}
           
           <div className='form-group mt-4 mb-3'>
           <h6 className='text-black-100'>User ID:</h6>
         <TextField 
           required
           value={user}
           onChange={e=>setUser(e.target.value)}
           variant="standard" 
           className='w-full font-bold'
           disabled
           />
         </div>
  
  
         <div className='form-group mt-4 mb-3'>
         <h6 className='text-black-100'>Title</h6>
         <TextField 
           required
           value={title}
           onChange={e=>setTitle(e.target.value)}
           variant="standard" 
           className='w-full'
           />
         </div>
  
      
        
          <div className='form-group mt-7 '>
          <h6 className='text-black-100'>Tell Us Your Story</h6>
            <TextArea 
            rows={8} 
            required
            value={body}
            onChange={e=>setBody(e.target.value)}
            placeholder="Write Your Story"
            className='w-full'
            />
         </div>
        {Loading &&  <LinearProgress />}
          <div className='flex justify-between mx-auto mt-4'>
          {Loading ? <input type='submit' className='py-2 px-3 bg-blue-200 text-white cursor-not-allowed' value='Save' disabled/>:
          <input type='submit' className='py-2 px-3 bg-blue-500 text-white' value='Save' onClick={updateHandler}/>
          }
          <Link to='/dashboard'><input type='submit' className='py-2 px-3 bg-orange-500 text-white' value='Cancel'/></Link>
          </div>
        
         
      </div>
      </Container>
        
        }
        </div>
    </div>
  )
}

export default BlogEdit