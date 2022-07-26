import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';


const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [Error, setError] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [Success, setSuccess] = useState('')


  const handleSubmit = async (e) =>{
    e.preventDefault()
    const newUser ={
      name, email, password
    }

   try {
    const res = await axios.post(`http://localhost:5000/user/register`, newUser)
     res.data && setLoading(false)
     res.data && setSuccess('Account Successfully Created, Login Now!!')
   } catch (error) {
    setLoading(false)
    setError(error.message)
   }


  }
  return (
    <div className='mx-auto max-w-md mt-5'>
        <Card sx={{ minWidth: 275 }} className='shadow-xl'>
        {Loading &&  <LinearProgress />}
        {Success && <Alert className='text-center' severity="success">{Success}</Alert>}
        {Error && <Alert className='text-center' severity="error">{Error}</Alert>}
        <h1 className="text-center mt-4 font-bold text-4xl"><FontAwesomeIcon icon={faUserPlus}/> Register</h1>
      
      <CardContent>
        <form action='/register' method='POST' onSubmit={handleSubmit}>
        
       <div className='form-group mt-4 mb-3'>
       <TextField 
         required
         id="name"
         name="name"
         value={name}
         onChange={e=>setName(e.target.value)}
         label="Full Name"
         variant="standard" 
         className='w-full'
         />
       </div>

       <div className='form-group mt-4 mb-3'>
       <TextField 
         required
         id="email"
         name="email"
         value={email}
         onChange={e=>setEmail(e.target.value)}
         label="Email Address"
         variant="standard" 
         className='w-full'
        
         />
       </div>
       <div className='form-group mt-4 mb-3'>
       <TextField 
        required
         id="password"
         name="password"
         value={password}
         onChange={e=>setPassword(e.target.value)}
         label="Create Password"
         variant="standard" 
         type="password"
         className='w-full '
        />
       </div>

       <div className='form-group mt-4 mb-3'>
       <TextField 
        required
         id="password2"
         name="password2"
         value={password2}
         onChange={e=>setPassword2(e.target.value)}
         label="Confirm Password"
         variant="standard" 
         type="password"
         className='w-full '
        />
       </div>


      {!Loading ? 
      <button  type='submit' className='bg-slate-800 text-white py-2 px-9 rounded-2xl w-full'><FontAwesomeIcon icon={faPlusCircle} /> Register</button> :
      <button  type='submit' className='bg-slate-800 text-white py-2 px-9 rounded-2xl w-full'> Loading....</button>
    }
        <div className='mt-7'>
        <p>
          Already Have An Account? <Link to="/login"><span className='text-blue-400'>Login Here</span></Link>
        </p>
        </div>
        </form>
       
      </CardContent>
     
    </Card>
    </div>
  )
}

export default Register