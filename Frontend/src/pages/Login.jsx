import { useState } from 'react'
import { login } from '../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const {loginWithToken}  = useAuth()
  const navigate = useNavigate()
  
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      setError("All Fields are reuired")
    }

    if (formData.email.trim().length === 0 ||
      formData.password.trim().length === 0) {
      setError("Fields Cannot be Empty")
    }

    try {
      const data = await login(formData);
      
      if(data.success){
        setError(null)
        setSuccess("User Logged In Successfully")
        loginWithToken(data.token)
        toast.success("Successfully Logged In")
        navigate("/dashboard")
      }else{
        setError(data.message)
      }

    } catch (error) {
      throw new Error(error.message)
    } finally{
      setFormData({email: "", password: ""})
    }
    
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 mt-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-slate-500 mb-6">Log in to access your dashboard.</p>
        <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='form-group'> 
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email:</label>
            <input 
            type='email' 
            id='email'
            name='email' 
            placeholder='Enter your Email' 
            value={formData.email}
            onChange={(e) => setFormData((prevData) => ({...prevData, [e.target.name] : e.target.value}))}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required/>
        </div>
        <div className='form-group'> 
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password:</label>
            <input 
            type="password" 
            id='password' 
            name='password'
            placeholder='Enter Password' 
            value={formData.password}
            onChange={(e) => setFormData((prevData) => ({...prevData, [e.target.name] : e.target.value}))}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required/>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700">Login</button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      <p className="mt-6 text-center text-sm">Don't Have an Account?? <Link to={'/register'} className="font-medium text-blue-600 hover:underline">Register now</Link> </p>
      </div>
    </div>
  )
}

export default Login