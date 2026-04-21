import React, { useState } from 'react';
import * as api from '../utils/api';

const EmployeeForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!/^EMP\d{3}$/.test(employeeId)) errs.employeeId = 'Employee ID must follow pattern EMPXXX';
    if (!name) errs.name = 'Name is required';
    if (!email) errs.email = 'Must be a valid email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Must be a valid email';
    if (!department) errs.department = 'Department is required';
    if (!position) errs.position = 'Position is required';
    if (!joiningDate) errs.joiningDate = 'Joining date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setServerError('');
    if (!validate()) return;

    try {
      const res = await api.createEmployee({ employeeId, name, email, department, position, joiningDate });
      if (res.error) {
        setServerError(res.error);
      } else {
        setMessage('Employee created successfully');
      }
    } catch (err) {
      setServerError(err.response?.data?.message || 'Duplicate employeeId');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="employeeId-input"
          placeholder="Employee ID"
          value={employeeId}
          onChange={e => setEmployeeId(e.target.value)}
        />
        {errors.employeeId && <p>{errors.employeeId}</p>}

        <input
          data-testid="name-input"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          data-testid="email-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <p>{errors.email}</p>}

        <input
          data-testid="department-input"
          placeholder="Department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
        />
        {errors.department && <p>{errors.department}</p>}

        <input
          data-testid="position-input"
          placeholder="Position"
          value={position}
          onChange={e => setPosition(e.target.value)}
        />
        {errors.position && <p>{errors.position}</p>}

        <input
          data-testid="joiningDate-input"
          type="date"
          value={joiningDate}
          onChange={e => setJoiningDate(e.target.value)}
        />
        {errors.joiningDate && <p>{errors.joiningDate}</p>}

        <button data-testid="add-button" type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
      {serverError && <p>{serverError}</p>}
    </div>
  );
};

export default EmployeeForm;
