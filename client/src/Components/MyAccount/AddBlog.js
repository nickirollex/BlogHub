import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LinearProgress, TextField } from '@mui/material';
import TextArea from 'antd/lib/input/TextArea';
import { Container } from '@mui/system';
import { Alert } from 'antd';

const AddBlog = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [user, setUser] = useState('')
    const [file, setFile] = useState('')
    const [Success, setSuccess] = useState('')
    const [Error, setError] = useState(null)
    const [Loading, setLoading] = useState(false)


   
    useEffect(() => {
       
      const ress = JSON.parse(sessionStorage.getItem("user"))
      setUser(ress._id)
}, [])
         
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const newBlog ={
          title,body,user
        }
      if(file){
        const data = new FormData()
        const filename = Date.now() + file.name
        data.append("name", filename)
        data.append("file", file)
        newBlog.blogImage = filename
        try {
          setLoading(true)
          await axios.post('http://localhost:5000/uploads', data)
        } catch (error) {
          return false
          setError(error)
        }
      }

        try {
         
          const res = await axios.post(`http://localhost:5000/blogs`, newBlog)
           res.data && setSuccess('New Blog Created Successfully')
            res.data && setLoading(false)
          
         } catch (error) {
         
          setError(error.message)
         }
    }

  return (
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
         <form action='/newblog' method='POST' onSubmit={handleSubmit}>
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

        <div className='form-group mt-4 mb-1 '>
        <label  className="form-label"><h6>Select Blog Images</h6></label>
        <input class="form-control" type="file" id="formFile" onChange={e =>setFile(e.target.files[0])} />

        {file && (
          <img 
            className='h-52 w-full object-center object-cover mt-1'
            src={URL.createObjectURL(file)}
          />
        )}
        </div>

       <div className='form-group mt-4 mb-3'>
       <TextField 
         required
         value={title}
         onChange={e=>setTitle(e.target.value)}
         label="Title"
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
        <input type='submit' className='py-2 px-3 bg-blue-500 text-white' value='Save' />
        }
        <Link to='/dashboard'><input type='submit' className='py-2 px-3 bg-orange-500 text-white' value='Cancel'/></Link>
        </div>
      
        </form>
    </div>
    </Container>
  )
}

export default AddBlog