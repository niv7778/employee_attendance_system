# Employee Attendance Management System

## 📌 Description
A full-stack web application to manage employee attendance, track work hours, and generate monthly reports.

---

## 🚀 Key Features

### 👤 Employee Management
- Create and manage employee records
- Filter employees by department
- Input validation for employee details

### ⏱️ Attendance Tracking
- Check-in and check-out functionality
- Prevent duplicate or invalid entries
- Automatic calculation of work hours

### 📊 Smart Attendance Reports
- Monthly reports with:
  - Total working days
  - Present / absent / half-day counts
  - Total and average work hours
- Detailed daily attendance records

---

## 🛠️ Tech Stack
- Frontend: React.js  
- Backend: Spring Boot  
- Database: MySQL  

---

## ⚙️ Core Logic
- ≥ 8 hours → Present  
- 4–8 hours → Half-day  
- < 4 hours → Partial  

---

## 🔗 API Highlights
- Employee APIs (Create, Retrieve)
- Attendance APIs (Check-in, Check-out)
- Report API (Monthly summary)

---

## ▶️ How to Run

### Backend
```bash
cd springapp
mvn spring-boot:run

### Frontend
cd reactapp
npm install
npm start
