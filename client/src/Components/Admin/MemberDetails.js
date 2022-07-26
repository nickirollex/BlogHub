import React,{useState, useEffect} from 'react'
import { Divider, Result } from 'antd'
import { useParams,Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import { faCheck, faCheckCircle, faSave, faTrash, faUserLock } from '@fortawesome/free-solid-svg-icons';

const MemberDetails = () => {
  const PF = "http://localhost:5000/images/"
  const {id} = useParams()
   const [user, setUser] = useState({})
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const [ID, setID] = useState('')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [userImage, setuserImage] = useState('')
  const [verified, setVerified] = useState('')
  const [pending, setPending] = useState(false)
  const [flaw, setFlaw] = useState(null)
  const [success, setSuccess] = useState('')

  useEffect(() => {
   const fetchUserDetails = async () =>{
   try {
    const res = await axios.get(`http://localhost:5000/adminusers/${id}`)
    
    setUser(res.data)
    setLoading(false)
    setError(null)

    setID(res.data._id)
    setName(res.data.name)
    setEmail(res.data.email)
    setuserImage(res.data.userImage)
    setVerified(res.data.verified)
   } catch (error) {
    setError(error.message)
    setLoading(false)
    setUser(null)
   }
   }
   fetchUserDetails()
  }, [id])
  
  {/**All functions */}

  const updateHandler = async () =>{
    console.log('user updated')
  }

  const deleteHandler = async () =>{
    console.log('user deleted')
  }

  const suspendHandler = async () =>{
    console.log('user suspended')
  }

  {/** */}
  const verifyHandler = async (e) =>{
   try {
    setPending(true)
    const res = await axios.put(`http://localhost:5000/adminusers/verification/${id}`, {verified:!verified})
    res && setPending(false)
    res && setSuccess('User Verified Successfully')
   } catch (error) {
    setPending(false)
    setFlaw(error)
   }
  }
    const unVerifyHandler =async () =>{
      try {
        setPending(true)
        const res = await axios.put(`http://localhost:5000/adminusers/verification/${id}`, {verified:!verified})
        res && setPending(false)
        res && setSuccess('User Unverifed Successfully')
       } catch (error) {
        setFlaw(error)
       }
    }
    
  return (
    <div className='container'>
         
        {loading && <div className='mx-auto max-w-sm text-center mt-10'><CircularProgress /></div> }
        {error &&
        <Result
        status="500"
        title="500"
        subTitle={error}
        extra={<Link to='/'className='border-slate-500 text-slate-400 border-1 py-2 px-9 rounded-2xl' >Reload</Link>}
      />}
       <div className=' p-8 shadow-2xl max-w-4xl mx-auto rounded-xl'>
       {pending &&  <LinearProgress />}
       <div className='mb-3 mx-auto text-center max-w-lg'>
        {success && <Alert className='text-center' severity="success">{success}</Alert>}
        {flaw && <Alert className='text-center' severity="error">{flaw}</Alert>}
       </div>

       <div className='flex'>
        <div className='mx-auto basis-1/2'> 
          {user.userImage ?
           <img src={PF + user.userImage}
           className="h-36 w-36 rounded-full mx-auto text-center cursor-pointer"
            alt="User Profile " /> :

            <div className=''>
               <img src='/userAvatar.png'
           className="h-36 w-36 rounded-full mx-auto text-center cursor-pointer"
            alt="User Avatar " />
            </div>

          }
            
          <div className='mt-2 text-lg text-center mx-auto'>
            {verified && <span className=''> <FontAwesomeIcon icon={faCheck} className='text-white text-2xl p-1 bg-green-500 rounded-full shadow-lg' /> </span>}<br/><br/>
            <span className='font-bold'>Account Created: </span> <br/>
          <span className='font-monospace text-bold text-blue-800'>{new Date (user.date).toDateString()}</span>
          </div>
         </div>
        
            <div className=' max-w-full basis-full'>
            <div className='form-group '>
             <h6 className='text-blue-800 text-md '>User ID Number</h6>
                <input type='text' className='p-3 w-full rounded-full border-1 border-slate-300' value={ID} disabled/>
               </div>

               <div className='form-group mt-4'>
               <h6 className='text-blue-800 text-md '>User Name</h6>
                <input type='text' className='p-3 w-full rounded-full border-1 border-slate-300' onChange={e=>setName(e.target.value)} value={Name}/>
               </div>

               <div className='form-group mt-4 '>
               <h6 className='text-blue-800 text-md '>User Email Address</h6>
                <input type='text' className='p-3 w-full rounded-full border-1 border-slate-300' onChange={e=>setEmail(e.target.value)} value={Email}/>
               </div>
            </div>
        </div>
       </div>
        
        <div className=' mt-2 p-4 bg-white shadow-2xl max-w-2xl mx-auto rounded-xl '>
        <div className='action-section flex flex-col sm:flex sm:flex-row justify-between'>
          <button className='py-2 px-4 bg-blue-400 text-white rounded-lg mt-2'  onClick={updateHandler}>Update <FontAwesomeIcon icon={faSave} /> </button>
          <button className='py-2 px-4 bg-red-500 text-white rounded-lg mt-2' onClick={deleteHandler}>Remove <FontAwesomeIcon icon={faTrash} /></button>
          <button className='py-2 px-4 bg-yellow-500 text-white rounded-lg mt-2' onClick={suspendHandler}>Suspend <FontAwesomeIcon icon={faUserLock} /></button>
{ user.verified ?
  <button className='py-2 px-4 bg-red-800 text-white rounded-lg mt-2' type='submit' onClick={unVerifyHandler}>Un-Verify <FontAwesomeIcon icon={faCheckCircle} /></button>
  :
<button className='py-2 px-4 bg-green-500 text-white rounded-lg mt-2' type='submit' onClick={verifyHandler}>Verify <FontAwesomeIcon icon={faCheckCircle} /></button>

}        </div>
        </div>
    </div>
  )
}

export default MemberDetails