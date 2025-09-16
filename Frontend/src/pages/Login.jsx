import { useState } from 'react'
import { login } from '../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

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
      console.log(data);
      
      if(data.success){
        setError(null)
        setSuccess("User Logged In Successfully")
        loginWithToken(data.token)
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'> 
            <label htmlFor="email">Email:</label>
            <input 
            type='email' 
            id='email'
            name='email' 
            placeholder='Enter your Email' 
            value={formData.email}
            onChange={(e) => setFormData((prevData) => ({...prevData, [e.target.name] : e.target.value}))}
            required/>
        </div>
        <div className='form-group'> 
            <label htmlFor="password">Password:</label>
            <input 
            type="password" 
            id='password' 
            name='password'
            placeholder='Enter Password' 
            value={formData.password}
            onChange={(e) => setFormData((prevData) => ({...prevData, [e.target.name] : e.target.value}))}
            required/>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
      <p>Don't Have an Account?? <Link to={'/register'}><span>Register</span></Link> </p>
    </div>
  )
}

export default Login