import { useState } from 'react'
import Login from './pages/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-teal-400 mb-4">🏥 MediDesk</h1>
        <p className="text-gray-400 mb-6">You are logged in!</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default App
