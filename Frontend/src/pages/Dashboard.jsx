import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getUsersLinks } from '../services/linkService.js'
import Spinner from '../components/Spinner/Spinner.jsx'

const Dashboard = () => {

  const { token } = useAuth()
  const [linksList, setLinksList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedLinkId, setCopiedLinkId] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchLinks = async () => {
      try {

        const data = await getUsersLinks(token)
        if (data) {
          setLinksList(data.data)
        }

      } catch (error) {
        console.log("Error", error.message)
        setError(error.message)

      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()
  }, [])


  const handleCopy = async (shortURL, linkId) => {
    if (!shortURL) return

    try {
      await navigator.clipboard.writeText(shortURL)
      setCopiedLinkId(linkId)

      setTimeout(() => setCopiedLinkId(null), 500)

    } catch (error) {
      console.log("Error While Copying to clipboard", error.message);
      alert("Failed to copy url")
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Dashboard</h2>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">

        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : error ? (
          <p className="p-6 text-red-500">Error: {error}</p>
        ) :
          linksList.length > 0 ? (
            <table className="w-full text-left" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead className="bg-slate-50 border-b">
                <tr style={{ borderBottom: '2px solid #333' }}>
                  <th className="p-4 font-semibold">Original URL</th>
                  <th className="p-4 font-semibold">Short URL</th>
                  <th className="p-4 font-semibold text-center">Clicks</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {linksList.map((link) => (
                  <tr key={link._id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-4 max-w-xs truncate">
                      <a href={link.longURL} title={link.longUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {link.longURL.substring(0, 50)}...
                      </a>
                    </td>
                    <td className="p-4">
                      <a href={link.shortURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-mono hover:underline">
                        {link.shortURL}
                      </a>
                    </td>
                    <td className="p-4 text-center font-semibold">
                      {link.clicks}
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md"
                        onClick={() => handleCopy(link.shortURL, link._id)}>
                        {copiedLinkId === link._id ? 'Copied!' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="p-6 text-center text-slate-500">You haven't created any short links yet. Go to the homepage to create your first one!</p>
        }
      </div>
    </div>
  )
}

export default Dashboard