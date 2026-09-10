export default function Toolbar({
  search,
  onSearchChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
  onNewPatient
}) {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="Search by name, city or ID…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={sortField} onChange={(e) => onSortFieldChange(e.target.value)}>
        <option value="">Unsorted</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
        <option value="bmi">BMI</option>
      </select>

      <select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>

      <button className="btn btn-primary" onClick={onNewPatient}>
        + New Patient
      </button>
    </div>
  )
}
