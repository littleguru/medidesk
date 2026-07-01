import { useState, useEffect } from 'react'
import api from '../api'

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    full_name: '', phone: '', email: '',
    date_of_birth: '', gender: '', blood_type: '', allergies: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients/')
      setPatients(res.data)
    } catch (err) {
      setError('Failed to load patients')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await api.post('/patients/', form)
      setSuccess('Patient added successfully')
      setShowForm(false)
      setForm({ full_name: '', phone: '', email: '', date_of_birth: '', gender: '', blood_type: '', allergies: '' })
      fetchPatients()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add patient')
    } finally {
      setSaving(false)
    }
  }

  const filtered = patients.filter(p =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  )

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Patients</h2>
          <p className="text-gray-400 text-sm mt-1">{patients.length} total patients</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Patient'}
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/40 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-4 text-sm">
          {success}
        </div>
      )}

      {/* Add Patient Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">New Patient</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
              <input
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
                placeholder="John Kamau"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone *</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
                placeholder="0712345678"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
                placeholder="john@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
              <input
                type="date"
                value={form.date_of_birth}
                onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Blood Type</label>
              <select
                value={form.blood_type}
                onChange={(e) => setForm({ ...form, blood_type: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
              >
                <option value="">Select</option>
                {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bt => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Allergies</label>
              <input
                value={form.allergies}
                onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
                placeholder="Penicillin, Peanuts..."
              />
            </div>
            <div className="col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Patient'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone..."
          className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500"
        />
      </div>

      {/* Patients Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <div className="grid grid-cols-5 px-6 py-3 border-b border-gray-800 text-gray-400 text-sm font-medium">
          <span>Name</span>
          <span>Phone</span>
          <span>Gender</span>
          <span>Blood Type</span>
          <span>Allergies</span>
        </div>

        {loading && (
          <div className="px-6 py-12 text-center text-gray-400">Loading patients...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-400">No patients found</div>
        )}

        {!loading && filtered.map((patient, index) => (
          <div
            key={patient.id}
            className={`grid grid-cols-5 px-6 py-4 items-center hover:bg-gray-800/50 transition-colors ${index !== filtered.length - 1 ? 'border-b border-gray-800' : ''}`}
          >
            <div>
              <p className="text-white font-medium">{patient.full_name}</p>
              <p className="text-gray-500 text-xs">{patient.email || 'No email'}</p>
            </div>
            <span className="text-gray-300">{patient.phone}</span>
            <span className="text-gray-300">{patient.gender || '—'}</span>
            <span className="text-gray-300">{patient.blood_type || '—'}</span>
            <span className="text-gray-300 text-sm">{patient.allergies || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
