import React,{useState} from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignIn } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState({})
  const [Error, setError] = useState(null)
  const [Loading, setLoading] = useState(false)

  const navigate = useNavigate() //navigate to dashboard after validation
  //Login using axios
  const submitHandler = async (e) =>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios({
        method: "POST",
        data: {
              email: email,
              password: password
        },
        withCredentials: true,
        url: "http://localhost:5000/user/login"
      })

      if(res.status === 400 || !res) {
        setLoading(false)
        setError("This User Or Account Does Not Exist")
      }else{
        const user = sessionStorage.setItem("user", JSON.stringify(res.data))
     user ? 
     setTimeout(() => {
        navigate('/dashboard') 
      }, 2000)
      : navigate('/login')

      }
    
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error.message)
    }

  }

  return (
    <div className='login mx-auto max-w-md mt-20'>
       
        <Card sx={{ minWidth: 275 }} className='shadow-xl'>
       {Loading &&  <LinearProgress />}
        <h1 className="text-center mt-4 mb-3 font-bold text-5xl"><FontAwesomeIcon icon={faSignIn}/>  Login</h1>
        {Error && <Alert severity="error">{Error}</Alert>}
      <CardContent>
        <form action='/login' method='POST' onSubmit={submitHandler}>
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


       <div className='form-group mt-4 mb-3'>
       <TextField 
        required
         id="password"
         name="password"
         value={password}
         onChange={e=>setPassword(e.target.value)}
         label="Password"
         variant="standard" 
         type="password"
         className='w-full '
        />
       </div>
       {!Loading ? 
       
       <button  type='submit' className='bg-slate-800 text-white py-2 px-9 rounded-2xl w-full'> Login</button> :
       <button disabled type='submit' className='bg-slate-800 text-white py-2 px-9 rounded-2xl w-full'>Loading......</button> 
      }
        <div className='mt-7'>
        <p>
          No Account? <Link to="/register"><span className='text-blue-400'>Register</span></Link>
        </p>
        </div>
        </form>
       
      </CardContent>
     
    </Card>
    </div>
  )
}

export default Login