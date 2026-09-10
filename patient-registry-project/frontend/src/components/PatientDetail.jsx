import { useEffect, useState } from 'react'

export default function PatientDetail({ id, patient, onSave, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setEditing(false)
    setError('')
    if (patient) {
      setForm({
        city: patient.city,
        age: patient.age,
        gender: patient.gender,
        height: patient.height,
        weight: patient.weight
      })
    }
  }, [id, patient])

  if (!id || !patient) {
    return (
      <div className="panel">
        <p className="hint">
          Select a patient from the list to view their record, or create a new one.
        </p>
      </div>
    )
  }

  const handleField = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSave = async () => {
    setError('')
    try {
      await onSave(id, {
        ...form,
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight)
      })
      setEditing(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = () => {
    if (confirm(`Delete ${patient.name} (${id})? This cannot be undone.`)) {
      onDelete(id)
    }
  }

  const disabled = !editing

  return (
    <div className="panel">
      <h2>{patient.name}</h2>
      <div className="id-tag">{id}</div>

      <div className="stat-row">
        <div className="stat">
          <div className="num">{patient.bmi}</div>
          <div className="label">BMI</div>
        </div>
        <div className="stat">
          <div className="num">{patient.verdict}</div>
          <div className="label">Status</div>
        </div>
      </div>

      <div className="field-grid">
        <div className="field">
          <label>City</label>
          <input
            type="text"
            value={form.city}
            disabled={disabled}
            onChange={(e) => handleField('city', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Age</label>
          <input
            type="number"
            min="1"
            max="119"
            value={form.age}
            disabled={disabled}
            onChange={(e) => handleField('age', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Gender</label>
          <select
            value={form.gender}
            disabled={disabled}
            onChange={(e) => handleField('gender', e.target.value)}
          >
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
            value={form.height}
            disabled={disabled}
            onChange={(e) => handleField('height', e.target.value)}
          />
        </div>
        <div className="field">
          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={form.weight}
            disabled={disabled}
            onChange={(e) => handleField('weight', e.target.value)}
          />
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="panel-actions">
        {editing ? (
          <>
            <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setEditing(false)
                setError('')
                setForm({
                  city: patient.city,
                  age: patient.age,
                  gender: patient.gender,
                  height: patient.height,
                  weight: patient.weight
                })
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => setEditing(true)}>Edit record</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete patient</button>
          </>
        )}
      </div>
    </div>
  )
}
