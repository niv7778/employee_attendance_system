// src/utils/api.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

// GET employees (optionally by department)
export const getEmployees = async (department) => {
  const url = `${API_BASE_URL}/employees`;
  const config = department ? { params: { department } } : {};
  const res = await axios.get(url, config);
  return res.data; // ✅ Always return plain array
};

export const getEmployeeById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/employees/${id}`);
  return res.data;
};

export const createEmployee = async (employee) => {
  const res = await axios.post(`${API_BASE_URL}/employees`, employee);
  return res.data;
};

export const checkInAttendance = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/attendance/check-in`, payload);
  return res.data; // ✅ tests expect .status inside this object
};

export const checkOutAttendance = async (payload) => {
  const res = await axios.put(`${API_BASE_URL}/attendance/check-out`, payload);
  return res.data;
};

export const getAttendanceReport = async (employeeId, year, month) => {
  const res = await axios.get(`${API_BASE_URL}/attendance/report`, {
    params: { employeeId, year, month },
  });
  return res.data;
};
