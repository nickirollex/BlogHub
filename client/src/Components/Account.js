import React,{useState, useEffect} from 'react'
import { Menu, Dropdown, Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTimesCircle, faTools, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert'


function Account() {
  const PF = "http://localhost:5000/images/"
  const [Data, setData] = useState({})
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [file, setFile] = useState('')
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)
  const [Success, setSuccess] = useState('')

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
       const getData = async()=>{
    const res = await JSON.parse(sessionStorage.getItem("user"))
    setData(res)
    setName(Data.name)
    setEmail(Data.email)
    setFile(Data.userImage)
       }
      getData()
}, [])

const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};


  const logoutHandler = async(e)  =>{
    e.preventDefault()
   try {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/user/logout"
     })
    sessionStorage.removeItem("user");
    navigate('/login')
   } catch (error) {
    
   }
  }
{/**----------------------------------------------------- */}

const updateHandler = async (e) =>{
  e.preventDefault()
  const updatedUser ={
    name: Name, 
    email:Email
  }
  if(file){
    const data = new FormData()
    const filename = Date.now() + file.name
    data.append("name", filename)
    data.append("file", file)
    updatedUser.userImage = filename
    try {
      setLoading(true)
      await axios.post('http://localhost:5000/uploads', data)
    } catch (error) {
      setError(error)
    }
  }

      try {
        const res =  await axios.put(`http://localhost:5000/user/${Data._id}`, updatedUser)
        sessionStorage.setItem("user", JSON.stringify(res.data))
        res && setLoading(false)
        res && setSuccess('User Details Successfully Updated')
      } catch (error) {
        setLoading(false)
        setError(error)
      }
}




const menu = (
    <Menu style={{padding:'40px', margin: '10px'}}>
      {location.pathname === '/' &&  <Menu.Item key="1=0" className='menuItem'  style={{marginBottom:'20px'}}>
        <Link to="/dashboard" ><FontAwesomeIcon icon={faUser} style={{fontSize:'17px'}}/> <span style={{marginLeft:'10px'}}>Dashboard</span></Link>
      </Menu.Item>}
      <Menu.Item key="1" className='menuItem'  style={{marginBottom:'20px'}}>
        <div onClick={showModal}><FontAwesomeIcon icon={faUser} style={{fontSize:'17px'}}/> <span style={{marginLeft:'10px'}}>My Account</span></div>
      </Menu.Item>
      <Menu.Item key="2" className='menuItem'  style={{marginBottom:'20px'}}>
        <a href="https://www.aliyun.com"><FontAwesomeIcon icon={faList} style={{fontSize:'17px'}}/> <span style={{marginLeft:'10px'}}>Ratings</span></a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" className='menuItem' style={{marginBottom:'10px'}}>
       <Button type='submit' size='middle' style={{width:'150px'}} onClick={logoutHandler}><span className='text-black'>Logout</span></Button>
      </Menu.Item>
    </Menu>
)
    return (
        <div className=' cursor-pointer'>
            <Dropdown overlay={menu} trigger={['click']}>
    <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
     <span className='text-3xl pointer-cursor'>
     {Data.userImage ? <div className='hover:brightness-50'> <img src={PF + Data.userImage} className="h-10 w-10 rounded-full mx-auto text-center cursor-pointer"/></div>:
     <img src='avatar.png' className="h-10 w-10  rounded-full mx-auto text-center cursor-pointer"/>
     }
      </span> 
    </span>
  </Dropdown>


  <Modal 
  title={<div className='text-center text-3xl '>User Information Settings <FontAwesomeIcon icon={faTools} /></div>} 
   visible={isModalVisible}
   onOk={handleOk}
    onCancel={handleCancel}
    footer={null}
    closeIcon={<div ><FontAwesomeIcon icon={faTimesCircle} className='text-xl bg-red-500 rounded-full mt-1 p-1 text-white'/></div>}
    maskClosable={false}
    >
        {Loading &&  <LinearProgress />}
        {Success && <Alert className='text-center' severity="success">{Success}</Alert>}
        {Error && <Alert className='text-center' severity="error">{Error}</Alert>}
        <form action='' method='put' onSubmit={updateHandler}>
        <div className='form-group mt-4 mb-3'>
         <h6 className='text-black-100'>Name</h6>
         <TextField 
           required
           value={Name}
           onChange={e=>setName(e.target.value)}
           variant="standard" 
           className='w-full'
           />
         </div>

         <div className='form-group mt-4 mb-3'>
         <h6 className='text-black-100'>Email Address</h6>
         <TextField 
           required
           value={Email}
           onChange={e=>setEmail(e.target.value)}
           variant="standard" 
           className='w-full'
           />
         </div>
         
         <div className='form-group mt-4 mb-3 flex'>
          <div className='p-4 rounded-full bg-gray-100 '>
          <input type='file' accept='image/*' onChange={e=>setFile(e.target.files[0])} className=''/>
          </div>
        <div className='img'>
        {file && (
          <img 
          className='h-20 w-20 rounded-full'
          src={URL.createObjectURL(file)}
          alt=''
        />
        )}
        </div>
         </div>

         <div className='form-group mt-10 mb-3'>
         <button  type='submit' className='bg-slate-800 text-white py-2 px-9 rounded-2xl w-full'> Update</button>
         </div>
        </form>
      </Modal>
        </div>
    )
}

export default Account
