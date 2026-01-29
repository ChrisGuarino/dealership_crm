# Dealership CRM

A full-stack car dealership management system for tracking vehicle sales, service appointments, and customer relationships. Built as a database systems term project.

## Features

- **Customer Management** — Add, view, and manage customer records
- **Vehicle Inventory** — Track dealership vehicle stock
- **Sales Processing** — Record vehicle sales with pricing, generate bills
- **Service Scheduling** — Book and manage maintenance appointments
- **Service Rendering** — Log parts, labor, and tests performed during service
- **Sales Analytics** — Query sales statistics and profit by car type over a date range

## Tech Stack

- **Frontend:** React
- **Backend:** SQL database (Oracle/MySQL/SQL Server/DB2)
- **Data:** CSV import/export, SQL schema scripts

## Project Structure

```
dealership_crm/
├── term_project/
│   ├── new-dealership/      # React frontend application
│   │   └── src/
│   │       ├── Customers.js
│   │       ├── Vehicles.js
│   │       ├── Services.js
│   │       └── Sales.js
│   ├── *.sql                # Database schema and seed scripts
│   ├── *.csv                # Sample data
│   └── start.sh             # Application startup script
└── README.md
```

## Usage

```bash
cd term_project
./start.sh
```
