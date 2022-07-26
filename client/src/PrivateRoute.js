import React from 'react'
import{ Navigate ,Outlet} from 'react-router-dom'

const PrivateRoute = ({Auth}) => {
  return Auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute