// Thin wrapper around the existing FastAPI endpoints.
// Paths are relative — the Vite dev server proxy (see vite.config.js)
// forwards them to the backend, so no backend code changes are needed.

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  let body = null
  try {
    body = await res.json()
  } catch (e) {
    // no JSON body (e.g. some error responses)
  }

  if (!res.ok) {
    const detail = body && body.detail ? body.detail : res.statusText
    throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail))
  }

  return body
}

// GET /view  -> { P001: {...}, P002: {...} }
export const viewPatients = () => request('/view')

// GET /patient/{id}
export const getPatient = (id) => request(`/patient/${id}`)

// GET /sort?sort_by=&order=  -> array of records (no ids attached)
export const sortPatients = (sortBy, order) =>
  request(`/sort?sort_by=${sortBy}&order=${order}`)

// POST /create
export const createPatient = (payload) =>
  request('/create', { method: 'POST', body: JSON.stringify(payload) })

// PUT /edit/{id}
export const updatePatient = (id, payload) =>
  request(`/edit/${id}`, { method: 'PUT', body: JSON.stringify(payload) })

// DELETE /delete/{id}
export const deletePatient = (id) =>
  request(`/delete/${id}`, { method: 'DELETE' })
