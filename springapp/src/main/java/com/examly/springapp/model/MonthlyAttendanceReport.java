package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MonthlyAttendanceReport {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long employeeId;
    private String employeeName;
    private int year;
    private int month;
    private int totalWorkDays;
    private int presentDays;
    private int absentDays;
    private int halfDays;
    private int totalWorkHours;
}
