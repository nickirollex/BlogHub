import React from 'react'
import Sidebar from './Sidebar'


const Verification = () => {
  
  return (
    
    <div className='max-w-full mx-auto flex  flex-row'>
<div className='sideBar bg-slate-900 h-screen basis-1/4 hidden md:block sticky'>
<Sidebar />
</div>

<div  className='py-5 px-4  bg-gray-100 shadow-2xl  h-screen basis-full '>
   <div className='bg-white p-2 shadow-4xl mx-auto'> <h1 className='text-center text-xl'>Verification</h1></div>
</div>
</div>
   
   
  )
}

export default Verification