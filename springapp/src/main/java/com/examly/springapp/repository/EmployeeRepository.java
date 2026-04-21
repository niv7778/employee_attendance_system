package com.examly.springapp.repository;

import com.examly.springapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmployeeId(String employeeId);
    List<Employee> findByDepartment(String department);
    boolean existsByEmployeeId(String employeeId);
    boolean existsByEmail(String email);
}
