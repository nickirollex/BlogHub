import React from 'react'
import { Empty, Tooltip,Popconfirm, Modal,Result,Button  } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import useFetch from '../useFetch'
import { Link } from 'react-router-dom';
import axios from 'axios'


const MyBlogs = ({_id}) => {
    const{Data:blogs,loading,error, setData} = useFetch(`http://localhost:5000/blogs/${_id}`)

    {/**Delete functions */}
    const cancel = e => {
      console.log('Click on No');
    };

  const confirm = async(_id) =>{
    try {
      await axios({
        method: "DELETE",
        withCredentials: true,
        url:` http://localhost:5000/blogs/${_id}`
      })
      setData(blogs.filter(blog => blog._id !==_id))
      Modal.success({
        title: 'Successfully Deleted',
        content:'This Action Is Directly Removed From Server And Not Retrievable',
        onOk() {},
      });
    } catch (error) {
      
    }
  }
   
  return (
    <div className=' mx-auto max-w-6xl'>
       
      {/*when fetching is loading */}
      {loading && <div className='mx-auto max-w-sm text-center mt-10'><CircularProgress /></div> }

      

            <div>
               {blogs &&
                <table  className="table table-hover table-borderless">
               {  blogs.length === 0 ? <Empty /> : <thead>
                  <tr>
                    <th className='text-xl'>Title</th>
                    <th className='text-xl'>Date</th>
                    <th className='text-xl'>Action</th>
                  </tr>
                </thead>}
                    
               {blogs.map(blog =>
                 <tbody key={blog._id}>
                 <tr className='bg-gray-60'>
                 <td className='p-4'>{blog.title}</td>
                 <td>{new Date (blog.createAt).toDateString()}</td>
                 <td className=''> 
                  <div className='flex justify-between'>
                  <a href={`blogdetails/${blog._id}`}><span className='cursor-pointer  py-1 px-2 bg-green-400 text-white'><Tooltip title='View Blog'> <FontAwesomeIcon icon={faEye} /></Tooltip></span></a>
                  <a href={`blogedit/${blog._id}`}><span className='cursor-pointer  py-1 px-2 bg-blue-400 text-white'><Tooltip title='Edit Blog'><FontAwesomeIcon icon={faEdit} /></Tooltip></span></a>
                  <span  className='cursor-pointer py-1 px-2 bg-red-400 text-white'><Tooltip title='Delete'>
                    
                  <Popconfirm
              title="Are you sure to delete this post?"
             onConfirm={()=>confirm(blog._id)}
              onCancel={cancel}
              okText="Yes"
               cancelText="No"
  >
                    <FontAwesomeIcon icon={faTrash} />
   
  </Popconfirm>
                    </Tooltip>
                    </span>
                  </div>
                  </td>
               </tr>
             </tbody>
                )}
            </table>
               }

            </div>
      

        {error && 
        <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
        }
     
    </div>
  )
}

export default MyBlogs