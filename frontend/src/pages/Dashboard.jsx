import { useState, useEffect } from 'react'
import api from '../api'

export default function Dashboard({ onLogout }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTodayAppointments()
  }, [])

  const fetchTodayAppointments = async () => {
    try {
      const res = await api.get('/appointments/today')
      setAppointments(res.data)
    } catch (err) {
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status })
      fetchTodayAppointments()
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const statusColors = {
    scheduled: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-300 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
    no_show: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Good morning, Doctor 👋</h2>
          <p className="text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Today's Appointments</p>
            <p className="text-3xl font-bold text-white mt-1">{appointments.length}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-400 mt-1">
              {appointments.filter(a => a.status === 'completed').length}
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Remaining</p>
            <p className="text-3xl font-bold text-teal-400 mt-1">
              {appointments.filter(a => a.status === 'scheduled').length}
            </p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-gray-900 rounded-xl border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-semibold text-white">Today's Queue</h3>
            <button
              onClick={fetchTodayAppointments}
              className="text-teal-400 hover:text-teal-300 text-sm transition-colors"
            >
              ↻ Refresh
            </button>
          </div>

          {loading && (
            <div className="px-6 py-12 text-center text-gray-400">Loading appointments...</div>
          )}

          {error && (
            <div className="px-6 py-12 text-center text-red-400">{error}</div>
          )}

          {!loading && !error && appointments.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-400">No appointments scheduled for today</p>
            </div>
          )}

          {!loading && appointments.map((apt, index) => (
            <div key={apt.id} className={`px-6 py-5 flex items-center justify-between ${index !== appointments.length - 1 ? 'border-b border-gray-800' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="bg-teal-500/20 text-teal-300 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-white">Patient #{apt.patient_id}</p>
                  <p className="text-gray-400 text-sm">{apt.reason || 'No reason provided'}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(apt.appointment_date).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                    {' · '}{apt.doctor_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[apt.status]}`}>
                  {apt.status.replace('_', ' ')}
                </span>

                {apt.status === 'scheduled' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(apt.id, 'completed')}
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateStatus(apt.id, 'no_show')}
                      className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                    >
                      No Show
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}