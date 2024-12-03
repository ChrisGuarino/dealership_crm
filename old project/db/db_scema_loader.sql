-- Drop the database if it exists and create a new one
DROP DATABASE IF EXISTS CarDealership;
CREATE DATABASE CarDealership;
USE CarDealership;

CREATE TABLE Customers (
    Customer_ID INT AUTO_INCREMENT PRIMARY KEY,
    F_Name VARCHAR(50),
    M_Init CHAR(1),
    L_Name VARCHAR(50),
    Phone VARCHAR(15),
    Email VARCHAR(100),
    Address VARCHAR(255)
);

-- Customer_Cars table
CREATE TABLE Customer_Cars (
    Car_ID INT PRIMARY KEY,
    Interior VARCHAR(50),
    Odometer INT,
    Color VARCHAR(50),
    License_Plate_State VARCHAR(2),
    License_Plate VARCHAR(10)
);

-- Cars_In_Inventory table
CREATE TABLE Cars_In_Inventory (
    Car_ID INT PRIMARY KEY,
    Interior VARCHAR(50),
    Odometer INT,
    Color VARCHAR(50),
    Cost DECIMAL(10, 2)
);

-- Vehicle_Type table
CREATE TABLE Vehicle_Type (
    Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
    Make VARCHAR(50),
    Madel VARCHAR(50),
    Year INT,
    Tire_Type VARCHAR(50),
    Engine_Type VARCHAR(50)
);

-- Car table
CREATE TABLE Car (
    Car_ID INT PRIMARY KEY,
    Interior VARCHAR(50),
    Odometer INT,
    Color VARCHAR(50),
    Vehicle_ID INT,
    FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle_Type(Vehicle_ID)
);

-- Appointment table


-- Time_Slot table
CREATE TABLE Time_Slot (
    Time_Slot_ID INT AUTO_INCREMENT PRIMARY KEY,
    Start_Time TIME,
    End_Time TIME,
    Date DATE
);

-- Package table
CREATE TABLE Package (
    Package_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Time_Since_Purchase INT
);

-- Task table
CREATE TABLE Task (
    Task_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Estd_Time INT,
    Estd_Labor_Cost DECIMAL(10, 2)
);

-- Part table
CREATE TABLE Part (
    Part_ID INT AUTO_INCREMENT PRIMARY KEY,
    Cost_Of_Part DECIMAL(10, 2),
    Name VARCHAR(100)
);

-- Purchase table
CREATE TABLE Purchase (
    Purchase_ID INT AUTO_INCREMENT PRIMARY KEY,
    Date_Of_Purchase DATE,
    Sale_Price DECIMAL(10, 2),
    Car_ID INT,
    FOREIGN KEY (Car_ID) REFERENCES Car(Car_ID)
);

-- Owns table
CREATE TABLE Owns (
    Customer_ID INT,
    Car_ID INT,
    PRIMARY KEY (Customer_ID, Car_ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID),
    FOREIGN KEY (Car_ID) REFERENCES Car(Car_ID)
);

-- Made_Purchase table
CREATE TABLE Made_Purchase (
    Customer_ID INT,
    Purchase_ID INT,
    PRIMARY KEY (Customer_ID, Purchase_ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID),
    FOREIGN KEY (Purchase_ID) REFERENCES Purchase(Purchase_ID)
);

-- Recommends table
CREATE TABLE Recommends (
    Package_ID INT,
    Task_ID INT,
    Is_Mandatory BOOLEAN,
    PRIMARY KEY (Package_ID, Task_ID),
    FOREIGN KEY (Package_ID) REFERENCES Package(Package_ID),
    FOREIGN KEY (Task_ID) REFERENCES Task(Task_ID)
);

-- Failure_Requires table
CREATE TABLE Failure_Requires (
    Task_ID INT,
    Part_ID INT,
    PRIMARY KEY (Task_ID, Part_ID),
    FOREIGN KEY (Task_ID) REFERENCES Task(Task_ID),
    FOREIGN KEY (Part_ID) REFERENCES Part(Part_ID)
);

CREATE TABLE Appointment (
    Appointment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Drop_Off DATETIME,
    Pick_Up DATETIME,
    Appointment_Made_Date DATETIME,
    Car_ID INT,
    Package_ID INT,
    Time_Slot_ID INT,
    Customer_ID INT,
    FOREIGN KEY (Car_ID) REFERENCES Car(Car_ID),
    FOREIGN KEY (Package_ID) REFERENCES Package(Package_ID),
    FOREIGN KEY (Time_Slot_ID) REFERENCES Time_Slot(Time_Slot_ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID)
);

-- Additionally_Scheduled table
CREATE TABLE Additionally_Scheduled (
    Appointment_ID INT,
    Task_ID INT,
    PRIMARY KEY (Appointment_ID, Task_ID),
    FOREIGN KEY (Appointment_ID) REFERENCES Appointment(Appointment_ID),
    FOREIGN KEY (Task_ID) REFERENCES Task(Task_ID)
);

-- Was_Performed table
CREATE TABLE Was_Performed (
    Appointment_ID INT,
    Task_ID INT,
    Labor_Cost DECIMAL(10, 2),
    Time INT,
    PRIMARY KEY (Appointment_ID, Task_ID),
    FOREIGN KEY (Appointment_ID) REFERENCES Appointment(Appointment_ID),
    FOREIGN KEY (Task_ID) REFERENCES Task(Task_ID)
);

-- Was_Replaced table
CREATE TABLE Was_Replaced (
    Appointment_ID INT,
    Part_ID INT,
    PRIMARY KEY (Appointment_ID, Part_ID),
    FOREIGN KEY (Appointment_ID) REFERENCES Appointment(Appointment_ID),
    FOREIGN KEY (Part_ID) REFERENCES Part(Part_ID)
);

-- Used_In table
CREATE TABLE Used_In (
    Vehicle_ID INT,
    Part_ID INT,
    PRIMARY KEY (Vehicle_ID, Part_ID),
    FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle_Type(Vehicle_ID),
    FOREIGN KEY (Part_ID) REFERENCES Part(Part_ID)
);

-- Populate Customers
INSERT INTO Customers (F_Name, M_Init, L_Name, Phone, Email, Address)
VALUES 
('John', 'A', 'Doe', '555-1234', 'john.doe@example.com', '123 Main St'),
('Jane', 'B', 'Smith', '555-5678', 'jane.smith@example.com', '456 Elm St');

-- Populate Vehicle_Type
INSERT INTO Vehicle_Type (Make, Madel, Year, Tire_Type, Engine_Type)
VALUES 
('Toyota', 'Camry', 2020, 'All-Season', 'V6'),
('Ford', 'F-150', 2019, 'All-Terrain', 'V8');

-- Populate Car
INSERT INTO Car (Car_ID, Interior, Odometer, Color, Vehicle_ID)
VALUES 
(1, 'Leather', 12000, 'Black', 1),
(2, 'Cloth', 30000, 'White', 2);

-- Populate Customer_Cars
INSERT INTO Customer_Cars (Car_ID, Interior, Odometer, Color, License_Plate_State, License_Plate)
VALUES 
(1, 'Leather', 12000, 'Black', 'PA', 'ABC123'),
(2, 'Cloth', 30000, 'White', 'NJ', 'XYZ789');

-- Populate Cars_In_Inventory
INSERT INTO Cars_In_Inventory (Car_ID, Interior, Odometer, Color, Cost)
VALUES 
(3, 'Leather', 1000, 'Red', 25000),
(4, 'Cloth', 5000, 'Blue', 20000);

-- Populate Package
INSERT INTO Package (Name, Time_Since_Purchase)
VALUES 
('Basic Maintenance', 6),
('Premium Maintenance', 12);

-- Populate Time_Slot
INSERT INTO Time_Slot (Start_Time, End_Time, Date)
VALUES 
('09:00:00', '10:00:00', '2024-12-01'),
('10:00:00', '11:00:00', '2024-12-01');

-- Populate Appointment
INSERT INTO Appointment (Drop_Off, Pick_Up, Appointment_Made_Date, Car_ID, Package_ID, Time_Slot_ID, Customer_ID)
VALUES 
('2024-12-01 09:00:00', '2024-12-01 11:00:00', '2024-11-15', 1, 1, 1, 1),
('2024-12-01 10:00:00', '2024-12-01 12:00:00', '2024-11-16', 2, 2, 2, 2);

-- Populate Task
INSERT INTO Task (Name, Estd_Time, Estd_Labor_Cost)
VALUES 
('Oil Change', 30, 50.00),
('Tire Rotation', 45, 75.00);

-- Populate Part
INSERT INTO Part (Cost_Of_Part, Name)
VALUES 
(50.00, 'Oil Filter'),
(100.00, 'Tire');

-- Populate Purchase
INSERT INTO Purchase (Date_Of_Purchase, Sale_Price, Car_ID)
VALUES 
('2024-01-01', 25000, 1),
('2024-02-01', 20000, 2);

-- Populate Owns
INSERT INTO Owns (Customer_ID, Car_ID)
VALUES 
(1, 1),
(2, 2);

-- Populate Made_Purchase
INSERT INTO Made_Purchase (Customer_ID, Purchase_ID)
VALUES 
(1, 1),
(2, 2);

-- Populate Recommends
INSERT INTO Recommends (Package_ID, Task_ID, Is_Mandatory)
VALUES 
(1, 1, TRUE),
(2, 2, FALSE);

-- Populate Failure_Requires
INSERT INTO Failure_Requires (Task_ID, Part_ID)
VALUES 
(1, 1),
(2, 2);

-- Populate Additionally_Scheduled
INSERT INTO Additionally_Scheduled (Appointment_ID, Task_ID)
VALUES 
(1, 1),
(2, 2);

-- Populate Was_Performed
INSERT INTO Was_Performed (Appointment_ID, Task_ID, Labor_Cost, Time)
VALUES 
(1, 1, 50.00, 30),
(2, 2, 75.00, 45);

-- Populate Was_Replaced
INSERT INTO Was_Replaced (Appointment_ID, Part_ID)
VALUES 
(1, 1),
(2, 2);

-- Populate Used_In
INSERT INTO Used_In (Vehicle_ID, Part_ID)
VALUES 
(1, 1),
(2, 2);
