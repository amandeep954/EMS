# BMDU Technical Assessment: Employee Management System (MERN Stack)

A modern, full-stack **Employee Management System** developed with **MongoDB, Express.js, React.js, Node.js, and Tailwind CSS**. It features a clean, responsive admin dashboard allowing full CRUD operations, live search and multi-criteria filters, real-time metrics, and robust server/client validation.

---

## 🌟 Key Features

### 1. Responsive Admin Dashboard (React + Tailwind CSS)
- **Modern Dashboard UI**: Clean layout with custom theme, stats cards, and action shortcuts.
- **Real-time Analytics**: Cards showing Total Employees, Active count, Inactive count, and unique Departments.
- **Dynamic Table**: Lists employees with custom initials avatars, department-colored badges, active status indicators with pulse animation, and formatted joining dates.
- **Advanced Filtering & Search**:
  - Live search across Name, Email, Designation, and Phone number.
  - Status filter dropdown (`All`, `Active`, `Inactive`).
  - Department filter dropdown (`Engineering`, `Human Resources`, `Sales`, `Marketing`, etc.).
  - Multi-option sorting (Recently Added, Name A-Z, Name Z-A, Joining Date).
  - Quick Reset button.
- **Interactive Modals**:
  - **Add/Edit Employee Modal**: With client-side validations and server-side error banners.
  - **Employee Details Modal**: Full employee profile card view with timestamps and contact links.
  - **Delete Confirmation Modal**: Prevents accidental deletion with safety prompt.
- **Toast Notifications**: Floating alerts for operations (Create, Update, Delete, Error).

### 2. Robust Backend & RESTful APIs (Node.js + Express.js)
- Built on the **MVC (Model-View-Controller)** pattern.
- Complete CRUD API endpoints with error handling.
- Centralized error-handling middleware handling Mongoose validation errors, duplicate keys (`11000`), and CastErrors.
- CORS enabled for seamless cross-origin communication.

### 3. Database Schema & Validation (MongoDB + Mongoose)
- **Employee Schema**:
  - `name`: Required, String, trimmed, min 2 chars.
  - `email`: Required, unique, trimmed, regex format validation.
  - `phone`: Required, regex format validation.
  - `department`: Required, Enum (`Engineering`, `HR`, `Marketing`, `Sales`, `Finance`, `Design`, etc.).
  - `designation`: Required, String.
  - `joiningDate`: Required, Date format.
  - `status`: Enum (`Active`, `Inactive`), default `Active`.
  - Timestamps (`createdAt`, `updatedAt`).

---

## 📁 Project Architecture & Directory Structure

```
Employee Management System/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── employeeController.js # CRUD business logic & stats
│   ├── middleware/
│   │   └── errorMiddleware.js    # 404 & centralized error handler
│   ├── models/
│   │   └── Employee.js           # Mongoose Employee schema & validations
│   ├── routes/
│   │   └── employeeRoutes.js     # Express REST endpoints
│   ├── .env                      # Environment config (Port, Mongo URI)
│   ├── package.json
│   ├── seed.js                   # Mock data seeder
│   ├── server.js                 # Express server entry point
│   └── testApi.js                # Automated backend test suite
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── employeeApi.js    # Axios API service
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Header with action buttons
│   │   │   ├── StatsOverview.jsx        # Metric summary cards
│   │   │   ├── FiltersBar.jsx           # Search & filter toolbar
│   │   │   ├── EmployeeTable.jsx        # Data table with avatars & action buttons
│   │   │   ├── EmployeeModal.jsx        # Add / Edit employee form modal
│   │   │   ├── EmployeeDetailsModal.jsx # Detailed profile modal
│   │   │   ├── DeleteConfirmModal.jsx   # Deletion confirmation dialog
│   │   │   └── Toast.jsx                # Toast alerts
│   │   ├── App.jsx               # Main container component
│   │   ├── index.css             # Tailwind base styles
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── EXPLANATION_GUIDE.md          # Interview & Viva explanation guide (Hinglish)
├── package.json                  # Root runner script
└── README.md                     # Documentation
```

---

## 🚀 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/employees` | Get all employees (Supports query: `search`, `status`, `department`, `sort`) |
| `GET` | `/api/employees/stats/summary` | Get summary counts (Total, Active, Inactive, Departments) |
| `GET` | `/api/employees/:id` | Get details of a single employee |
| `POST` | `/api/employees` | Add a new employee |
| `PUT` | `/api/employees/:id` | Update an existing employee |
| `DELETE` | `/api/employees/:id` | Delete an employee record |

---

## 🛠️ Getting Started / Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Running locally or a MongoDB Atlas URI)

### 1. Clone & Install Dependencies
From the root directory:
```bash
# Install root, backend, and frontend packages
npm run install:all
```
*(Or manually run `npm install` inside both `backend` and `frontend` folders)*

### 2. Configure Environment Variables
Verify or edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
NODE_ENV=development
```

### 3. Seed Sample Data (Optional but Recommended)
Populate the database with 8 realistic employee records:
```bash
npm run seed
```

### 4. Run Automated Backend Tests
Test all 10 API endpoints and validations:
```bash
npm run test:backend
```

### 5. Start the Application
To run both backend and frontend concurrently with one command:
```bash
npm run dev
```

Or run them in separate terminals:
- **Backend:** `npm run server` (runs on `http://localhost:5000`)
- **Frontend:** `npm run client` (runs on `http://localhost:3000`)

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🧪 Testing Checklist
- [x] **Add Employee**: Click "Add Employee", enter valid info, submit, check if employee appears in list and stats update.
- [x] **Validation**: Try submitting an invalid email or short name; notice validation feedback.
- [x] **Duplicate Email**: Try adding an employee with an existing email; check error banner.
- [x] **Search**: Type name/designation/email in the search bar; table updates in real time.
- [x] **Filters**: Select "Inactive" or "Engineering" to filter records.
- [x] **View Details**: Click the Eye icon on any row to open the full profile card.
- [x] **Edit Employee**: Click the Pencil icon, modify details, save, and check updated values.
- [x] **Delete Employee**: Click the Trash icon, confirm deletion; employee is deleted and count decrements.

---

## 📄 License
ISC License • Built for BMDU Technical Assessment.
