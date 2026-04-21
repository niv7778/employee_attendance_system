package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Pattern(regexp = "EMP\\d{3}", message = "Employee ID must follow format 'EMP' followed by 3 digits")
    @Column(unique = true, nullable = false, name = "employee_id")
    private String employeeId;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Email(message = "Must be a valid email")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Department cannot be empty")
    private String department;

    @NotBlank(message = "Position cannot be empty")
    private String position;

    @NotNull(message = "Joining date is required")
    private LocalDate joiningDate;
}
