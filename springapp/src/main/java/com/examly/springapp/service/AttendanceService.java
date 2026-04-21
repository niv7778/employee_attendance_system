package com.examly.springapp.service;

import com.examly.springapp.model.Attendance;
import com.examly.springapp.model.Employee;
import com.examly.springapp.repository.AttendanceRepository;
import com.examly.springapp.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    public Attendance checkIn(String employeeId, LocalDateTime checkInTime) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        LocalDate today = checkInTime.toLocalDate();
        if (attendanceRepository.findByEmployeeAndDate(employee, today).isPresent()) {
            throw new IllegalArgumentException("Already checked in today");
        }

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDate(today);
        attendance.setCheckInTime(checkInTime);
        attendance.setCheckOutTime(null);
        attendance.setWorkHours(0.0);
        attendance.setStatus("Present");

        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(String employeeId, LocalDateTime checkOutTime) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        LocalDate today = checkOutTime.toLocalDate();
        Attendance attendance = attendanceRepository.findByEmployeeAndDate(employee, today)
                .orElseThrow(() -> new IllegalArgumentException("Must check in before check out"));

        if (attendance.getCheckOutTime() != null) {
            throw new IllegalArgumentException("Already checked out today");
        }

        attendance.setCheckOutTime(checkOutTime);

        double hours = Duration.between(attendance.getCheckInTime(), checkOutTime).toMinutes() / 60.0;
        attendance.setWorkHours(hours);

        if (hours >= 8) {
            attendance.setStatus("Present");
        } else if (hours >= 4) {
            attendance.setStatus("Half-day");
        } else {
            attendance.setStatus("Absent");
        }

        return attendanceRepository.save(attendance);
    }

    public Map<String, Object> getMonthlyReport(String employeeId, int year, int month) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<Attendance> records = attendanceRepository.findByEmployeeAndDateBetween(employee, start, end);

        int presentDays = (int) records.stream().filter(a -> "Present".equals(a.getStatus())).count();
        int halfDays = (int) records.stream().filter(a -> "Half-day".equals(a.getStatus())).count();
        double totalWorkHours = records.stream().mapToDouble(Attendance::getWorkHours).sum();

        Map<String, Object> report = new HashMap<>();
        report.put("employeeId", employee.getEmployeeId());
        report.put("employeeName", employee.getName());
        report.put("year", year);
        report.put("month", month);
        report.put("totalWorkDays", records.size());
        report.put("presentDays", presentDays);
        report.put("halfDays", halfDays);
        report.put("totalWorkHours", totalWorkHours);

        List<Map<String, Object>> dailyRecords = new ArrayList<>();
        for (Attendance a : records) {
            Map<String, Object> rec = new HashMap<>();
            rec.put("date", a.getDate());
            rec.put("checkInTime", a.getCheckInTime());
            rec.put("checkOutTime", a.getCheckOutTime());
            rec.put("status", a.getStatus());
            rec.put("workHours", a.getWorkHours());
            dailyRecords.add(rec);
        }
        report.put("dailyRecords", dailyRecords);

        return report;
    }
}
