export default function PatientList({ entries, selectedId, onSelect }) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        No patients match. Try a different search, or add a new patient.
      </div>
    )
  }

  return (
    <div className="list">
      {entries.map(([id, p]) => (
        <div
          key={id}
          className={`record ${id === selectedId ? 'selected' : ''}`}
          onClick={() => onSelect(id)}
        >
          <div className="who">
            <div className="name">{p.name}</div>
            <div className="meta">{id} · {p.city} · {p.age}y · {p.gender}</div>
          </div>
          <span className={`badge ${p.verdict}`}>{p.bmi} BMI</span>
        </div>
      ))}
    </div>
  )
}
