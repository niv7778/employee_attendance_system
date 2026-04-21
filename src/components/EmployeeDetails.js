import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await api.getEmployeeById(id);
        setEmployee(data);
      } catch {
        setError('Employee not found');
      }
    };
    fetchEmployee();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <p>Employee ID: <span>{employee.employeeId}</span></p>
      <p>Name: <span>{employee.name}</span></p>
      <p>Email: <span>{employee.email}</span></p>
      <p>Department: <span>{employee.department}</span></p>
      <p>Position: <span>{employee.position}</span></p>
      <p>Joining Date: <span>{employee.joiningDate}</span></p>
    </div>
  );
};

export default EmployeeDetails;
