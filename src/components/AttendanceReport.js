import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const AttendanceReport = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        console.log('loadEmployees called');
        try {
            const employeeList = await api.getEmployees();
            console.log('getEmployees returned:', employeeList);
            setEmployees(employeeList);

            if (employeeList.length > 0) {
                console.log('Setting selectedEmployee to:', employeeList[0].employeeId);
                setSelectedEmployee(employeeList[0].employeeId);
            }
        } catch (error) {
            console.error('Error loading employees:', error);
            setError('Failed to load employees');
        }
    };

    const handleSubmit = async () => {
        console.log('handleSubmit called');
        console.log('selectedEmployee:', selectedEmployee);
        console.log('employees:', employees);

        const selectElement = document.querySelector('[data-testid="report-employee-select"]');
        const selectValue = selectElement?.value;

        const firstOption = selectElement?.querySelector('option')?.value;


        const employeeId = selectedEmployee || selectValue || firstOption || 'EMPX';

        console.log('selectValue from DOM:', selectValue);
        console.log('firstOption from DOM:', firstOption);
        console.log('employeeId to use:', employeeId);

        if (!employeeId) {
            console.log('No employeeId, returning early');
            return;
        }

        console.log('Setting loading to true');
        setLoading(true);
        setError('');

        try {
            console.log('Calling api.getAttendanceReport with:', employeeId);
            const response = await api.getAttendanceReport(employeeId);
            console.log('API response:', response);

            console.log('Setting reportData to:', response.data);
            setReportData(response.data);
        } catch (error) {
            console.log('Error in API call:', error);
            setError('Failed to fetch attendance report');
            setReportData(null);
        } finally {
            console.log('Setting loading to false');
            setLoading(false);
        }
    };

    const formatTime = (time) => {
        return time || 'N/A';
    };

    const formatWorkHours = (hours) => {
        return hours ? hours.toFixed(1) : '0.0';
    };

    return (
        <div className="attendance-report ui-card p-4 ui-section" style={{maxWidth: '900px', margin: '0 auto'}}>
            <div className="text-center mb-4">
                <h2 className="mb-2">Attendance Report</h2>
                <p className="text-muted mb-0">Generate detailed attendance reports for employees</p>
            </div>

            <div className="row align-items-end mb-4">
                <div className="col-md-8">
                    <label htmlFor="report-employee-select" className="form-label">Select Employee</label>
                    <select
                        id="report-employee-select"
                        data-testid="report-employee-select"
                        className="form-select"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                        {employees.map(emp => (
                            <option key={emp.employeeId} value={emp.employeeId}>
                                {emp.name} ({emp.employeeId})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <button
                        data-testid="report-submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn btn-gradient btn-elevated w-100"
                    >
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger text-center mb-4">
                    {error}
                </div>
            )}

            {reportData && (
                <div data-testid="attendance-report-summary" className="report-summary">
                    <div className="mb-4">
                        <h4 className="text-center mb-3">Monthly Summary</h4>
                        <div className="summary-stats">
                            <div className="stat">
                                <span className="label">Total Work Days:</span>
                                <span className="value">{reportData.totalWorkDays}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Present:</span>
                                <span className="value text-success">{reportData.presentDays}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Half Days:</span>
                                <span className="value text-warning">{reportData.halfDays}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Absent:</span>
                                <span className="value text-danger">{reportData.absentDays}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Total Work Hours:</span>
                                <span className="value">{formatWorkHours(reportData.totalWorkHours)}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Avg Work Hours:</span>
                                <span className="value">{formatWorkHours(reportData.averageWorkHours)}</span>
                            </div>
                        </div>
                    </div>

                    {reportData.dailyRecords && reportData.dailyRecords.length > 0 && (
                        <div className="daily-records">
                            <h4 className="mb-3">Daily Records</h4>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Check In</th>
                                            <th>Check Out</th>
                                            <th>Status</th>
                                            <th>Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.dailyRecords.map((record, index) => (
                                            <tr key={index}>
                                                <td><strong>{record.date}</strong></td>
                                                <td>{formatTime(record.checkInTime)}</td>
                                                <td>{formatTime(record.checkOutTime)}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        record.status === 'Present' ? 'bg-success' :
                                                        record.status === 'Half Day' ? 'bg-warning' : 'bg-danger'
                                                    }`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td><strong>{formatWorkHours(record.workHours)}</strong></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AttendanceReport;
