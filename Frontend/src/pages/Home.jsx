import React, { useState } from 'react'
import { createShortURl } from '../services/apiService.js'
const Home = () => {

  const [longURL, setLongURL] = useState("")
  const [shortURL, setShortURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      if (!longURL || longURL.trim().length === 0) {
        setError("Enter valid URL")
      }

      setLoading(true)

      const data = await createShortURl(longURL)
      if (data.success) {
        setError(null)
        setShortURL(data.data)
      } else {
        setShortURL(null)
        setError(data.message)
      }
      
    } catch (error) {
      throw new Error(error)

    } finally {
      setLoading(false)
      setLongURL("")
    }
  }


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="longURL"></label>
        <input
          type="text"
          name="longURL"
          id="longURL"
          value={longURL}
          placeholder='Enter Url to shorten'
          onChange={(e) => setLongURL(e.target.value)} />
        <button type="submit">Create</button>
      </form>

      {loading ? (<p>Loading...</p>) : (
        <>
          {
            error && (
              <div className="error-container" style={{ color: 'red', marginTop: '1rem' }}>
                <p><strong>Error:</strong> {error}</p>
              </div>
            )
          }
          {
            shortURL && (
              <div className="result-container" style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
                <h3>Your Short URL is ready!</h3>
                <p>
                  <strong>Short Link:</strong>
                  <a
                    href={shortURL.shortURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#007bff' }}
                  >
                    {shortURL.shortURL}
                  </a>
                </p>
                <p style={{ fontSize: '0.8rem', color: '#555' }}>
                  Original URL: {shortURL.longURL?.substring(0, 70)}...
                </p>
              </div>
            )
          }
        </>
      )}

    </div>
  )
}

export default Home