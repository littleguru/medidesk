import { useState, useEffect } from 'react'
import api from '../api'

export default function BookAppointment() {
  const [patients, setPatients] = useState([])
  const [form, setForm] = useState({
    patient_id: '',
    doctor_name: '',
    appointment_date: '',
    appointment_time: '',
    reason: ''
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/patients/').then(res => setPatients(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const datetime = `${form.appointment_date}T${form.appointment_time}:00`
      await api.post('/appointments/', {
        patient_id: parseInt(form.patient_id),
        doctor_name: form.doctor_name,
        appointment_date: datetime,
        reason: form.reason
      })
      setSuccess('Appointment booked successfully!')
      setForm({ patient_id: '', doctor_name: '', appointment_date: '', appointment_time: '', reason: '' })
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to book appointment')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Book Appointment</h2>
        <p className="text-gray-400 text-sm mt-1">Schedule a new patient appointment</p>
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/40 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-4 text-sm">
          ✅ {success}
        </div>
      )}

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-400 mb-1">Patient *</label>
            <select
              required
              value={form.patient_id}
              onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
            >
              <option value="">Select patient...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.full_name} — {p.phone}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Doctor *</label>
            <input
              required
              value={form.doctor_name}
              onChange={(e) => setForm({ ...form, doctor_name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
              placeholder="Dr. Wanjiru"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date *</label>
              <input
                required
                type="date"
                value={form.appointment_date}
                onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Time *</label>
              <input
                required
                type="time"
                value={form.appointment_time}
                onChange={(e) => setForm({ ...form, appointment_time: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Reason for Visit</label>
            <textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
              placeholder="General checkup, follow-up, vaccination..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  )
}