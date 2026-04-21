import React, { useEffect, useState } from 'react';
import * as api from '../utils/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState('');

  const fetchEmployees = async (dept = '') => {
    const data = await api.getEmployees(dept);
    setEmployees(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilterChange = async (e) => {
    const dept = e.target.value;
    setDepartment(dept);
    await fetchEmployees(dept);
  };

  return (
    <div>
      <h1>Employees</h1>


      <select
        data-testid="department-filter"
        value={department}
        onChange={handleFilterChange}
      >
        <option value="">All</option>
        <option value="Engineering">Engineering</option>
        <option value="Sales">Sales</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Marketing">Marketing</option>

      </select>


      {employees.map(emp => (
        <div key={emp.employeeId}>
          <p>{emp.name}</p>
          <button>View Details</button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
