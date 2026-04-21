package com.examly.springapp.controller;

import com.examly.springapp.dto.CheckInRequest;
import com.examly.springapp.dto.CheckOutRequest;
import com.examly.springapp.model.Attendance;
import com.examly.springapp.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/check-in")
    public ResponseEntity<Map<String, Object>> checkIn(@RequestBody CheckInRequest request) {
        Attendance attendance = attendanceService.checkIn(request.getEmployeeId(), request.getCheckInTime());

        return ResponseEntity.status(201).body(Map.of(
                "employee", Map.of(
                        "employeeId", attendance.getEmployee().getEmployeeId(),
                        "name", attendance.getEmployee().getName()
                ),
                "date", attendance.getDate(),
                "status", attendance.getStatus(),
                "workHours", attendance.getWorkHours()
        ));
    }

    @PutMapping("/check-out")
    public ResponseEntity<Map<String, Object>> checkOut(@RequestBody CheckOutRequest request) {
        Attendance attendance = attendanceService.checkOut(request.getEmployeeId(), request.getCheckOutTime());

        return ResponseEntity.ok(Map.of(
                "employee", Map.of(
                        "employeeId", attendance.getEmployee().getEmployeeId(),
                        "name", attendance.getEmployee().getName()
                ),
                "date", attendance.getDate(),
                "status", attendance.getStatus(),
                "workHours", attendance.getWorkHours()
        ));
    }

    @GetMapping("/report")
    public ResponseEntity<Map<String, Object>> getMonthlyReport(
            @RequestParam String employeeId,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(attendanceService.getMonthlyReport(employeeId, year, month));
    }
}
