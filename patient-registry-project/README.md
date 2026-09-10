# Patient Registry

A small hospital/patient management app: a FastAPI backend backed by a JSON
file, and a React (Vite) frontend for it.

```
patient-registry-project/
├── backend/
│   ├── main.py                 # FastAPI app (unmodified)
│   ├── requirements.txt
│   └── patients.example.json   # sample data — copy to patients.json to start
└── frontend/
    └── ...                     # React app, see frontend/README.md
```

## Running it locally

**1. Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp patients.example.json patients.json
uvicorn main:app --reload
```

Runs at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

**2. Frontend**

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173` and proxies API calls to the backend
(see `frontend/vite.config.js`) — no CORS setup needed in `main.py`.

See `frontend/README.md` for more detail on the frontend.

## Notes

- `patients.json` is gitignored since it's local data that changes as you
  use the app. `patients.example.json` is the template — copy it once to
  get started.
