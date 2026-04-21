import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetails';
import AttendanceControl from './components/AttendanceControl';
import AttendanceReport from './components/AttendanceReport';
import './App.css';

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/employees" className="nav-link">Employees</Link>
        <Link to="/employees/new" className="nav-link">Add Employee</Link>
        <Link to="/attendance" className="nav-link">Attendance</Link>
        <Link to="/reports" className="nav-link">Reports</Link>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<div className="home-page"><h1>Employee Attendance System</h1><p>Welcome to the system.</p></div>} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/attendance" element={<AttendanceControl />} />
          <Route path="/reports" element={<AttendanceReport />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
