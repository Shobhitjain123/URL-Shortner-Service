import React from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/apiService'
const Register = () => {

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setError("All Fields are reuired")
    }

    if (formData.name.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0) {
      setError("Fields Cannot be Empty")
    }

    try {
      const data = await registerUser(formData)
      console.log(data);

      if (data.success) {
        setError(null)
        setSuccess("Registeration Successfull, Please Login")
      } else {
        setError(data.message)
      }

    } catch (error) {
      throw new Error(error.message)
    } finally {
      setFormData({ name: "", email: "", password: "" })
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id='name'
            name='name'
            placeholder='Enter Full Name'
            value={formData.name}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))}
            required />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your Email'
            value={formData.email}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))}
            required />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Pasword:</label>
          <input
            type="password"
            id='password'
            name='password'
            placeholder='Enter Password'
            value={formData.password}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))}
            required />
        </div>
        <button type='submit'>Register</button>
      </form>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
      <p>Already Have an account? <Link to={'/login'}><span>Login Here</span></Link></p>
    </div>
  )
}

export default Register