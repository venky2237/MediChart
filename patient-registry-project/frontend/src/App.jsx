import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Toolbar from './components/Toolbar.jsx'
import PatientList from './components/PatientList.jsx'
import PatientDetail from './components/PatientDetail.jsx'
import CreatePatientModal from './components/CreatePatientModal.jsx'
import Toast from './components/Toast.jsx'
import {
  viewPatients,
  sortPatients as apiSortPatients,
  createPatient,
  updatePatient,
  deletePatient
} from './api.js'

export default function App() {
  const [patients, setPatients] = useState({})   // { id: record }
  const [order, setOrder] = useState([])          // ids in display order, when sorted
  const [online, setOnline] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('ascending')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', isError: false, visible: false })

  const showToast = (message, isError = false) => {
    setToast({ message, isError, visible: true })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2600)
  }

  // Matches a record returned by /sort (no id attached) back to its id,
  // since /sort responds with bare record objects rather than {id: record}.
  const matchIdForRecord = (all, record) =>
    Object.keys(all).find(
      (id) =>
        all[id].name === record.name &&
        all[id].city === record.city &&
        all[id].height === record.height &&
        all[id].weight === record.weight
    )

  const loadPatients = async () => {
    try {
      const all = await viewPatients()
      setPatients(all)
      setOnline(true)

      if (sortField) {
        const sorted = await apiSortPatients(sortField, sortOrder)
        setOrder(sorted.map((r) => matchIdForRecord(all, r)).filter(Boolean))
      } else {
        setOrder(Object.keys(all))
      }
    } catch (err) {
      setOnline(false)
      showToast(`Could not reach the API: ${err.message}`, true)
    }
  }

  useEffect(() => {
    loadPatients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, sortOrder])

  const entries = useMemo(() => {
    const ordered = order.map((id) => [id, patients[id]]).filter(([, p]) => p)
    const q = search.trim().toLowerCase()
    if (!q) return ordered
    return ordered.filter(
      ([id, p]) =>
        id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
    )
  }, [order, patients, search])

  const handleCreate = async (payload) => {
    await createPatient(payload)
    setModalOpen(false)
    showToast('Patient created')
    setSelectedId(payload.id)
    await loadPatients()
  }

  const handleSave = async (id, payload) => {
    await updatePatient(id, payload)
    showToast('Patient updated')
    await loadPatients()
  }

  const handleDelete = async (id) => {
    try {
      await deletePatient(id)
      showToast('Patient deleted')
      if (selectedId === id) setSelectedId(null)
      await loadPatients()
    } catch (err) {
      showToast(err.message, true)
    }
  }

  return (
    <div className="app">
      <Header online={online} />

      <Toolbar
        search={search}
        onSearchChange={setSearch}
        sortField={sortField}
        onSortFieldChange={setSortField}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onNewPatient={() => setModalOpen(true)}
      />

      <div className="board">
        <PatientList entries={entries} selectedId={selectedId} onSelect={setSelectedId} />
        <PatientDetail
          id={selectedId}
          patient={selectedId ? patients[selectedId] : null}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>

      <CreatePatientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />

      <Toast message={toast.message} isError={toast.isError} visible={toast.visible} />
    </div>
  )
}
