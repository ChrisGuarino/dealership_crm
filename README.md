# CS631 - Assignment 4: Project Milestone 1 - Database Design

## Computer Science 631 - Database System Design
**Term Project**

In this term project, you are asked to design a small database system, create and populate this database using ORACLE, MySQL, SQL Server, or DB2, and write a number of application programs to access the database. The topic of the project is to design a database system that a car dealer can use to manage car sales, service appointments, service rendering, and sales statistics per car type. Below are the project guidelines, database design requirements, and application design requirements.

---

## 1. General Guidelines

1. **Teamwork**  
   - Projects will be done in groups of two.  
   - Form your own groups and post your team in the "Module 02 Discussion 01: Term Project Groupings" discussion board on Canvas.

2. **Demonstrations**  
   - Prepare professional demonstrations, treating them as if presenting to a customer.  
   - Demonstrations will occur after the term ends.  
   - A web-based application is preferred; you can use your own computer or NJIT’s systems.

3. **Project Report**  
   - Submit a **typed project report** including:
     - Summary of system requirements and any additions made.
     - Database design: entity-relationship design, relational logical database design, and application program design.
     - User manual for non-technical users with step-by-step instructions.
     - Design decisions with justifications.
     - Appendix listing relational instances used to populate the database.  
   - Your report should highlight your design and make it understandable for programmers and end-users.

---

## 2. Database Design Requirements

You will design a database to support customer relationship management (CRM) for a car dealership. The database should store data about:

- Vehicle purchases
- Service appointments
- Service rendering

### Required Insights from Database:
The database should support queries to answer the following:

- **Customer Insights**:
  - Recent vehicle purchase dates.
  - Number of vehicles purchased by each customer.
  - Total expenditure on vehicle purchases.
  - Total profit from customer purchases.

- **Service Insights**:
  - Recent service appointment dates.
  - Duration of service appointments (from drop-off to pick-up).
  - Contact information for prospective marketing campaigns.

### Notes:
- Direct answers to these queries are not required, but the database should store enough data to derive them.
- The database should also support the needs of three application programs described below.

---

## 2.1 Application Program 1: **Car Sale**
- Records customer and sale details.
- If the customer is new, their information must be added to the database.
- Records the **sold price** and **sale date**.
- Generates a bill for the customer.

---

## 2.2 Application Program 2: **Service Scheduling and Rendering**
- Handles car maintenance appointments.
- Tracks cars sold by the dealer and cars brought in from outside.
- **Scheduling**:
  - Records service appointments, including:
    - Car information.
    - Appointment time.
    - Estimated service duration.
  - Supports predefined service packages based on car age (e.g., 1-year, 2-year service).
- **Service Rendering**:
  - Logs:
    - Car arrival time.
    - Tests performed.
    - Replaced parts and labor time.
  - Generates a detailed bill for parts and labor.

---

## 2.3 Application Program 3: **Sale Statistics**
- Analyzes car sales within a given period.
- Inputs:
  - Start date.
  - End date.
- Outputs:
  - Number of cars sold.
  - Profit per car type (based on make, model, and year).

---
