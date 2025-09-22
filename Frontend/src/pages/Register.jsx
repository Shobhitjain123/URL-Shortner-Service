import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/apiService'
const Register = () => {
  const navigate = useNavigate()
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
        navigate('/login')
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
    <div className="max-w-md mx-auto">
      {success && toast.success(success)}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome</h2>
        <p className="text-center text-slate-500 mb-6">Register to create your dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name:</label>
            <input
              type="text"
              id='name'
              name='name'
              placeholder='Enter Full Name'
              value={formData.name}
              onChange={(e) => setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your Email'
              value={formData.email}
              onChange={(e) => setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Pasword:</label>
            <input
              type="password"
              id='password'
              name='password'
              placeholder='Enter Password'
              value={formData.password}
              onChange={(e) => setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>
          <button type='submit' className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700">Register</button>
        </form>
        {error && <p className="mt-6 text-center text-sm">{error}</p>}
        <p className="mt-6 text-center text-sm">Already Have an account? <Link to={'/login'} className="font-medium text-blue-600 hover:underline">Login Here</Link></p>
      </div>
    </div>
  )
}

export default Register