import React, { useEffect, useState } from "react";
import {
  getEmployees,
  checkInAttendance,
  checkOutAttendance,
} from "../utils/api";
import "./AttendanceControl.css";

const AttendanceControl = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [message, setMessage] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    getEmployees().then((data) => {
      if (Array.isArray(data)) setEmployees(data);
    });

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = async () => {
    const res = await checkInAttendance({ employeeId: selectedEmployee });
    if (res?.error) {
      setMessage(res.error);
    } else {
      setMessage("Check-in successful");
    }
  };

  const handleCheckOut = async () => {
    const res = await checkOutAttendance({ employeeId: selectedEmployee });
    if (res?.error) {
      setMessage(res.error);
    } else {
      setMessage("Check-out successful");
    }
  };

  return (
    <div className="attendance-control">
      <h2>Attendance Control</h2>

      <div>
        <label>Select Employee: </label>
        <select
          data-testid="employee-select"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">--Select--</option>
          {employees.map((emp) => (
            <option key={emp.employeeId} value={emp.employeeId}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <strong>Date & Time:</strong> {currentDateTime.toLocaleString()}
      </div>

      <div>
        <button data-testid="check-in-btn" onClick={handleCheckIn}>
          Check-In
        </button>
        <button data-testid="check-out-btn" onClick={handleCheckOut}>
          Check-Out
        </button>
      </div>

      {message && (
        <div data-testid="attendance-message">{message}</div>
      )}
    </div>
  );
};

export default AttendanceControl;
