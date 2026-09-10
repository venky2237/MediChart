import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The backend (main.py) is left completely untouched.
// Instead of adding CORS to FastAPI, the Vite dev server proxies
// API calls so the browser sees everything as same-origin.
// Change the target below if your FastAPI server runs elsewhere.
const BACKEND_URL = 'http://localhost:8000'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/view': BACKEND_URL,
      '/patient': BACKEND_URL,
      '/sort': BACKEND_URL,
      '/create': BACKEND_URL,
      '/edit': BACKEND_URL,
      '/delete': BACKEND_URL
    }
  }
})
