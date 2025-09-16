import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({children}) => {

  const {isLoading, isAuthenticated} = useAuth()    
  
  if(isLoading){
    return <p>Loading...</p>
  }

  if(isAuthenticated){
    return children
  }

  return <Navigate to={'/login'} replace/>
}

export default PrivateRoute