import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import {getUsersLinks} from '../services/linkService.js'

const Dashboard = () => {
  
  const {logout, token} = useAuth()
  const [linksList, setLinksList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchLinks = async() => {
        try {
               
        const data = await getUsersLinks(token)
        if(data){
          setLinksList(data.data)
        }
        
        } catch (error) {
          console.log("Error", error.message)
          setError(error.message)

        } finally{
          setIsLoading(false)
        }
    }

    fetchLinks()
  }, [])
  console.log(linksList);
  
  return (
    <div className="dashboard-container">
      <h2>My Dashboard</h2>
      <p>Welcome to your personal dashboard! Here you will be able to see all the links you have created.</p>
    
      <div className="links-list-placeholder" style= {{marginTop: '2rem'}}>

          {isLoading ? (
            <p>Loading your Links...</p>
          ) : error ? (
            <p className="error-message" style={{ color: 'red' }}>Error: {error}</p>
          ) : 
            linksList.length > 0 ? (
                <table className="links-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Original URL</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Short URL</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {/* 4. Use the .map() method to iterate over the links array */}
              {linksList.map((link) => (
                // 5. The `key` prop is crucial for React's performance and correctness.
                //    We use the unique `_id` from MongoDB as the key.
                <tr key={link._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px', wordBreak: 'break-all' }}>
                    {/* Display a truncated version of the long URL for cleaner UI */}
                    <a href={link.longURL} title={link.longUrl} target="_blank" rel="noopener noreferrer">
                      {link.longURL.substring(0, 50)}...
                    </a>
                  </td>
                  <td style={{ padding: '8px' }}>
                    {/* The short URL is a clickable link that opens in a new tab */}
                    <a href={link.shortURL} target="_blank" rel="noopener noreferrer">
                      {link.shortURL}
                    </a>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    {link.clicks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            ) : (<p>You haven't created any short links yet. Go to the homepage to create your first one!</p>)
          }

      </div>

      <button onClick={handleLogout} className="btn btn-logout" style={{ marginTop: '2rem' }}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard