# 🏥 MediChart

> **A modern hospital patient management system built with FastAPI and React.**

MediChart is a full-stack patient management application designed to simplify the management of hospital patient records. It combines a **FastAPI + Pydantic backend** with a **React + Vite frontend** and uses a lightweight **JSON-based data store**.

The system provides complete CRUD operations, automatic BMI calculation, health-status classification, patient search, and flexible sorting — all through a clean and intuitive web interface.

---

## ✨ Features

### 👤 Patient Management

Manage patient information including:

* Patient ID
* Name
* City
* Age
* Gender
* Height
* Weight

### ⚖️ Automatic BMI Calculation

BMI is calculated automatically on the server whenever a patient is created or updated.

The system classifies patients into:

| BMI Range     | Health Verdict |
| ------------- | -------------- |
| `< 18.5`      | 🟡 Underweight |
| `18.5 – 24.9` | 🟢 Normal      |
| `25 – 29.9`   | 🟠 Overweight  |
| `≥ 30`        | 🔴 Obese       |

### 🔍 Patient Search

Search and filter patients by:

* Patient name
* City
* Patient ID

### ↕️ Patient Sorting

Sort patient records by:

* Height
* Weight
* BMI

Supports both:

* Ascending order
* Descending order

### 🔄 Full CRUD Operations

MediChart supports complete patient record management:

* ➕ Create patient
* 👁️ View patient
* ✏️ Edit patient
* 🗑️ Delete patient

### 📊 REST API

The FastAPI backend provides RESTful endpoints with automatic interactive API documentation through Swagger UI.

---

# 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │    Vite Frontend    │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                               │ Pydantic
                               ▼
                    ┌─────────────────────┐
                    │   Patient Models    │
                    │  Validation + BMI   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     patients.json   │
                    │    JSON Data Store  │
                    └─────────────────────┘
```

---

# 📁 Project Structure

```text
medichart/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── patients.example.json
│   └── patients.json
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    │
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api.js
        ├── index.css
        │
        └── components/
            ├── Header.jsx
            ├── Toolbar.jsx
            ├── PatientList.jsx
            ├── PatientDetail.jsx
            ├── CreatePatientModal.jsx
            └── Toast.jsx
```

### Backend

| File                    | Purpose                               |
| ----------------------- | ------------------------------------- |
| `main.py`               | FastAPI application and API endpoints |
| `requirements.txt`      | Python dependencies                   |
| `patients.example.json` | Sample patient data                   |
| `patients.json`         | Local patient data store              |

### Frontend

| File                     | Purpose                     |
| ------------------------ | --------------------------- |
| `App.jsx`                | Main React application      |
| `main.jsx`               | React entry point           |
| `api.js`                 | Backend API communication   |
| `index.css`              | Global styling              |
| `Header.jsx`             | Application header          |
| `Toolbar.jsx`            | Search and sorting controls |
| `PatientList.jsx`        | Patient list/table          |
| `PatientDetail.jsx`      | Patient details             |
| `CreatePatientModal.jsx` | Create patient form         |
| `Toast.jsx`              | User notifications          |

---

# 🛠️ Tech Stack

### Frontend

* ⚛️ **React**
* ⚡ **Vite**
* 🎨 **CSS**
* 🌐 **Fetch API**

### Backend

* 🐍 **Python**
* 🚀 **FastAPI**
* 🛡️ **Pydantic**
* 📄 **JSON**

### Development

* Git
* GitHub
* REST API
* Swagger / OpenAPI

---

# 🚀 Getting Started

Follow the steps below to run MediChart locally.

## Prerequisites

Make sure you have the following installed:

* **Python 3.9+**
* **Node.js 18+**
* **npm**
* **Git**

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/medichart.git
```

Navigate into the project:

```bash
cd medichart
```

---

# 2️⃣ Setup the Backend

Navigate to the backend:

```bash
cd backend
```

### Create a virtual environment

### Windows

```powershell
python -m venv venv
```

Activate it:

```powershell
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Python dependencies

```bash
pip install -r requirements.txt
```

---

## Create the local database

MediChart uses a JSON file as its data store.

Copy the example data file:

### Windows

```powershell
copy patients.example.json patients.json
```

### macOS / Linux

```bash
cp patients.example.json patients.json
```

---

## Start the FastAPI server

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://localhost:8***
```

### Swagger API Documentation

Open:

```text
http://localhost:8***/docs
```

You can use Swagger UI to test all API endpoints directly from your browser.

---

# 3️⃣ Setup the Frontend

Open a **new terminal**.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5***
```

Open the URL in your browser and start using MediChart.

---

# 🔌 API Endpoints

The FastAPI backend exposes the following endpoints:

| Method   | Endpoint        | Description            |
| -------- | --------------- | ---------------------- |
| `GET`    | `/view`         | Get all patients       |
| `GET`    | `/patient/{id}` | Get a specific patient |
| `GET`    | `/sort`         | Sort patients          |
| `POST`   | `/create`       | Create a patient       |
| `PUT`    | `/edit/{id}`    | Update a patient       |
| `DELETE` | `/delete/{id}`  | Delete a patient       |

---

## GET — View Patients

```http
GET /view
```

Returns all patient records.

---

## GET — Get Patient

```http
GET /patient/{id}
```

Returns a specific patient using their patient ID.

Example:

```http
GET /patient/P001
```

---

## GET — Sort Patients

```http
GET /sort
```

Supports sorting by:

* Height
* Weight
* BMI

Example:

```http
GET /sort?sort_by=bmi&order=ascending
```

---

## POST — Create Patient

```http
POST /create
```

Creates a new patient record.

BMI and health verdict are calculated automatically by the backend.

---

## PUT — Update Patient

```http
PUT /edit/{id}
```

Updates an existing patient.

Example:

```http
PUT /edit/P001
```

BMI and health verdict are recalculated automatically.

---

## DELETE — Delete Patient

```http
DELETE /delete/{id}
```

Deletes an existing patient record.

Example:

```http
DELETE /delete/P001
```

---

# 🧮 BMI Calculation

MediChart calculates BMI using:

```text
BMI = Weight (kg) / Height² (m²)
```

For example:

```text
Weight = 70 kg
Height = 1.75 m

BMI = 70 / (1.75 × 1.75)
    = 22.86
```

The backend then determines the corresponding health verdict.

This calculation is performed **server-side**, ensuring that the frontend does not need to calculate or maintain BMI logic.

---

# 🔄 Data Flow

When creating or updating a patient:

```text
User enters patient information
            │
            ▼
      React Frontend
            │
            ▼
       REST API
            │
            ▼
       FastAPI Backend
            │
            ▼
     Pydantic Validation
            │
            ▼
      BMI Calculation
            │
            ▼
    Health Classification
            │
            ▼
      patients.json
            │
            ▼
       API Response
            │
            ▼
       React Frontend
```

---

# 📦 Data Storage

MediChart currently uses a simple JSON file instead of a traditional database.

```text
patients.example.json
        │
        │ copy
        ▼
patients.json
        │
        ├── Create
        ├── Read
        ├── Update
        └── Delete
```

### Why JSON?

The JSON data store keeps the project lightweight and easy to run locally without requiring additional database software.

> **Note:** `patients.json` is intentionally gitignored because it contains local, mutable data.

The repository includes:

```text
patients.example.json
```

as a starter dataset.

---

# 🔐 Git & Data Safety

The following files should **not** be committed to GitHub:

```text
node_modules/
venv/
dist/
patients.json
.env
.env.local
```

Only the example patient dataset should be included:

```text
patients.example.json
```

---

# 🧪 Running the Project

You need **two terminals**.

### Terminal 1 — Backend

```bash
cd backend

# Windows
venv\Scripts\activate

uvicorn main:app --reload
```

### Terminal 2 — Frontend

```bash
cd frontend

npm install
npm run dev
```

Then open:

```text
http://localhost:5***
```

---

# 📚 API Documentation

Once the backend is running, FastAPI automatically provides interactive documentation.

### Swagger UI

```text
http://localhost:8***/docs
```

### ReDoc

```text
http://localhost:8***/redoc
```

---

# 🔮 Future Improvements

Some potential improvements for future versions:

* 🗄️ Replace JSON storage with PostgreSQL/MySQL
* 🔐 User authentication and authorization
* 👨‍⚕️ Doctor and staff accounts
* 📊 Patient analytics dashboard
* 📈 Health and BMI charts
* 📅 Appointment management
* 💊 Medication management
* 📝 Medical history
* 📄 Generate patient reports
* ☁️ Cloud deployment
* 🧪 Automated backend and frontend tests
* 🐳 Docker support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

# 👨‍💻 Author

**VENKY CHUKKALA**

Built with ❤️ using:

**React + Vite + FastAPI + Pydantic**
