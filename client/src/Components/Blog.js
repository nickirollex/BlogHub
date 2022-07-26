import React from 'react'
import{Link } from 'react-router-dom'
const Blog = ({blog}) => {
  const PF = "http://localhost:5000/images/"
  return (
    <div className='relative'>
    <p className='text-white bg-slate-900 p-1 rounded-sm text-sm text-right'>{new Date (blog.createAt).toDateString()}</p>
    {blog.blogImage && <div className='hover:brightness-50'> <img src={PF + blog.blogImage} className="h-52 w-full " alt="blog Image"/></div>}
    <div className='absolute top-1/3 left-1/3 bg-slate-800 bg-opacity-50 py-4 px-7'>
    <div className='mx-auto text-center'> <Link to={`blogdetails/${blog._id}`} > 
    <span  className='py-1 px-3 rounded-sm text-white font-bold'>View</span> 
    </Link></div>
    </div>
    <h2 className='text-xl text-center p-2  font-bold'>{blog.title}</h2>
  </div>
  )
}

export default Blog