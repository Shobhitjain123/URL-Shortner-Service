import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { useAuth } from './context/AuthContext'

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <div className="bg-slate-100 min-h-screen text-slate-800">
        <Navbar />
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path='/login' element={isAuthenticated ? <Navigate to={'/dashboard'} /> : <Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </>
  )
}

export default App
