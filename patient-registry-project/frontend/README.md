# Patient Registry — React Frontend

A React (Vite) UI for the existing FastAPI patient management backend.
**No backend code is modified.** All six endpoints (`/view`, `/patient/{id}`,
`/sort`, `/create`, `/edit/{id}`, `/delete/{id}`) are called exactly as they
are defined in `main.py`.

## Project structure

```
hospital-management-frontend/
├── index.html
├── package.json
├── vite.config.js          # dev-server proxy → backend (see note below)
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx             # top-level state + orchestration
    ├── api.js              # fetch wrappers for the 6 endpoints
    ├── index.css           # design tokens + styles
    └── components/
        ├── Header.jsx
        ├── Toolbar.jsx           # search + sort + "new patient"
        ├── PatientList.jsx       # left column, folder-tab style rows
        ├── PatientDetail.jsx     # right column, view/edit/delete
        ├── CreatePatientModal.jsx
        └── Toast.jsx
```

## Why no CORS changes were needed

Since the backend can't be touched, the browser would normally be blocked by
CORS when calling `http://localhost:8000` from a page served on
`http://localhost:5173`. To get around that **without editing `main.py`**,
`vite.config.js` proxies API paths through the dev server:

```js
server: {
  proxy: {
    '/view': 'http://localhost:8000',
    '/patient': 'http://localhost:8000',
    '/sort': 'http://localhost:8000',
    '/create': 'http://localhost:8000',
    '/edit': 'http://localhost:8000',
    '/delete': 'http://localhost:8000'
  }
}
```

The frontend calls relative paths like `/view`, the Vite server forwards
them server-side to FastAPI, and the browser only ever sees same-origin
requests. If you later deploy the built frontend somewhere other than the
Vite dev server (e.g. a static host), you'll need either a reverse proxy
with the same rules, or to add CORS middleware to the backend at that point.

## Setup

1. Make sure the FastAPI backend is running first:
   ```bash
   uvicorn main:app --reload
   ```
   It should be reachable at `http://localhost:8000`. If it runs on a
   different port, update `BACKEND_URL` in `vite.config.js`.

2. Install frontend dependencies:
   ```bash
   cd hospital-management-frontend
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open the URL it prints (default `http://localhost:5173`).

## Features

- **List** — all patients with name, city, age, gender, and a color-coded
  BMI badge (Underweight / Normal / Overweight / Obese).
- **Search** — filters the list client-side by name, city, or ID.
- **Sort** — delegates to `GET /sort` by height, weight, or BMI, ascending
  or descending.
- **View / edit** — click a patient to see full details; "Edit record"
  unlocks the fields and saves via `PUT /edit/{id}`.
- **Delete** — with a confirmation prompt, via `DELETE /delete/{id}`.
- **Create** — modal form posting to `POST /create`.

## Note on sorting and IDs

`GET /sort` returns bare record objects without their patient IDs attached.
The frontend re-fetches `/view` alongside every sort and matches each sorted
record back to its ID by comparing name/city/height/weight. This works
unless two patients share identical values across all four fields.

## Build for production

```bash
npm run build
```

This outputs static files to `dist/`. Since the proxy only applies to the
Vite dev server, serving the built files elsewhere will need its own
reverse-proxy or CORS solution — again, without touching the backend
itself if you'd rather proxy at the web-server layer (nginx, etc).
