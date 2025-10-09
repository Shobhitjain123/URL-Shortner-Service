import React, { useState } from 'react'
import { createShortURl } from '../services/apiService.js'
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from '../components/Spinner/Spinner.jsx';
const Home = () => {
  const { token } = useAuth()
  const [longURL, setLongURL] = useState("")
  const [shortURL, setShortURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isCopied, setisCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setisCopied(false)

    try {

      if (!longURL || longURL.trim().length === 0) {
        setError("Enter valid URL")
      }

      setLoading(true)

      const data = await createShortURl(longURL, token)
      if (data.success) {
        setError(null)
        setShortURL(data.data)
      } else {
        setShortURL(null)
        setError(data.message)
      }

    } catch (error) {
      // throw new Error(error)
    } finally {
      setLoading(false)
      setLongURL("")
    }
  }

  const handleCopy = async() => {
    if(!shortURL) return

   try {
     await navigator.clipboard.writeText(shortURL)

     setisCopied(true)

     setTimeout(() => setisCopied(false), 500)

   } catch (error) {
      console.log("Error While Copying to clipboard", error.message);
      alert("Failed to copy url")
   }

  }

  return (
    <div className="max-w-2xl mx-auto text-center">
       <h1 className="text-4xl font-bold mb-2">URL Shortener</h1>
      <p className="text-lg text-slate-600">Enter a long URL to make it short and easy to share!</p>
      
      <div className='mt-8 bg-white p-8 rounded-lg shadow-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <label htmlFor="longURL"></label>
        <input
          type="text"
          name="longURL"
          id="longURL"
          value={longURL}
          placeholder='Enter Url to shorten'
          onChange={(e) => setLongURL(e.target.value)} 
          className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"/>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400 w-full sm:w-auto">
          {loading ? <Spinner size='small'/> : 'Shorten'}
        </button>
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
              <div className="mt-6 pt-6 border-t text-left">
                <div className="flex justify-between items-center bg-slate-100 p-3 rounded-md">
              <a href={shortURL.shortURL} target="_blank" rel="noopener noreferrer" className="font-mono text-blue-600 break-all">
                {shortURL.shortURL}
              </a>
              <button onClick={handleCopy} className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-md text-sm font-semibold ml-4">
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
              </div>
            )
          }
        </>
      )}
      </div>

    </div>
  )
}

export default Home