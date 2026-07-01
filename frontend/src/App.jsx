import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import BookAppointment from './pages/BookAppointment'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [page, setPage] = useState('dashboard')

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'patients', label: '👥 Patients' },
    { id: 'book', label: '📅 Book Appointment' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-400">🏥 MediDesk</h1>
        <div className="flex items-center gap-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === item.id ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Dr. Wanjiru</span>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {page === 'dashboard' && <Dashboard onLogout={handleLogout} />}
      {page === 'patients' && <Patients />}
      {page === 'book' && <BookAppointment />}
    </div>
  )
}

export default App