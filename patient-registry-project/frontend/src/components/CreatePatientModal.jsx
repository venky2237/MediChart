import { useState } from 'react'

const EMPTY = { id: '', name: '', city: '', age: '', gender: 'male', height: '', weight: '' }

export default function CreatePatientModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  if (!open) return null

  const handleField = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await onCreate({
        id: form.id.trim(),
        name: form.name.trim(),
        city: form.city.trim(),
        age: Number(form.age),
        gender: form.gender,
        height: Number(form.height),
        weight: Number(form.weight)
      })
      setForm(EMPTY)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleClose = () => {
    setForm(EMPTY)
    setError('')
    onClose()
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal">
        <h2>New patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Patient ID</label>
            <input
              type="text"
              placeholder="P006"
              required
              value={form.id}
              onChange={(e) => handleField('id', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleField('name', e.target.value)}
            />
          </div>
          <div className="field">
            <label>City</label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => handleField('city', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Age</label>
            <input
              type="number"
              min="1"
              max="119"
              required
              value={form.age}
              onChange={(e) => handleField('age', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Gender</label>
            <select value={form.gender} onChange={(e) => handleField('gender', e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="field">
            <label>Height (cm)</label>
            <input
              type="number"
              step="0.1"
              required
              value={form.height}
              onChange={(e) => handleField('height', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              required
              value={form.weight}
              onChange={(e) => handleField('weight', e.target.value)}
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={handleClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create patient</button>
          </div>
        </form>
      </div>
    </div>
  )
}
