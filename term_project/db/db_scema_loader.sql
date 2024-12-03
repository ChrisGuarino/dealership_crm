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
    Car_ID INT AUTO_INCREMENT PRIMARY KEY,
    Interior VARCHAR(50),
    Odometer INT,
    Color VARCHAR(50),
    Cost DECIMAL(10, 2)
);

-- Vehicle_Type table
CREATE TABLE Vehicle_Type (
    Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
    Make VARCHAR(50),
    Model VARCHAR(50),
    Year INT,
    Tire_Type VARCHAR(50),
    Engine_Type VARCHAR(50),
    UNIQUE (Make, Model, Year, Tire_Type, Engine_Type)
);

-- Car table
CREATE TABLE Car (
    Car_ID INT AUTO_INCREMENT PRIMARY KEY,
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

-- Populating Customers table
INSERT INTO Customers (F_Name, M_Init, L_Name, Phone, Email, Address)
VALUES
('John', 'A', 'Doe', '1234567890', 'john.doe@example.com', '123 Elm St'),
('Jane', 'B', 'Smith', '2345678901', 'jane.smith@example.com', '456 Oak St'),
('Alice', 'C', 'Brown', '3456789012', 'alice.brown@example.com', '789 Pine St'),
('Bob', 'D', 'Johnson', '4567890123', 'bob.johnson@example.com', '101 Maple St'),
('Charlie', 'E', 'Williams', '5678901234', 'charlie.williams@example.com', '202 Birch St');


-- Populating Vehicle_Type table
INSERT INTO Vehicle_Type (Make, Model, Year, Tire_Type, Engine_Type)
VALUES
('Toyota', 'Camry', 2020, 'All-season', 'Hybrid'),
('Honda', 'Civic', 2021, 'Summer', 'Gasoline'),
('Ford', 'Focus', 2019, 'All-terrain', 'Electric'),
('Tesla', 'Model 3', 2022, 'Performance', 'Electric'),
('Chevrolet', 'Malibu', 2018, 'All-season', 'Gasoline');


-- Populating Car table
INSERT INTO Car (Car_ID, Interior, Odometer, Color, Vehicle_ID)
VALUES
(1, 'Leather', 15000, 'Black', 1),
(2, 'Cloth', 20000, 'Blue', 2),
(3, 'Leather', 10000, 'White', 3),
(4, 'Synthetic', 5000, 'Red', 4),
(5, 'Vinyl', 30000, 'Silver', 5);


-- Populating Cars_In_Inventory table
INSERT INTO Cars_In_Inventory (Car_ID, Interior, Odometer, Color, Cost)
VALUES
(1, 'Leather', 15000, 'Black', 25000.00),
(2, 'Cloth', 20000, 'Blue', 22000.00),
(3, 'Leather', 10000, 'White', 27000.00),
(4, 'Synthetic', 5000, 'Red', 32000.00),
(5, 'Vinyl', 30000, 'Silver', 20000.00);


-- Populating Customer_Cars table
INSERT INTO Customer_Cars (Car_ID, Interior, Odometer, Color, License_Plate_State, License_Plate)
VALUES
(1, 'Leather', 15000, 'Black', 'CA', '7ABC123'),
(2, 'Cloth', 20000, 'Blue', 'NY', '8XYZ456'),
(3, 'Leather', 10000, 'White', 'TX', '9LMN789'),
(4, 'Synthetic', 5000, 'Red', 'FL', '5DEF321'),
(5, 'Vinyl', 30000, 'Silver', 'WA', '4GHI654');


-- Populating Time_Slot table
INSERT INTO Time_Slot (Start_Time, End_Time, Date)
VALUES
('08:00:00', '09:00:00', '2024-12-01'),
('09:00:00', '10:00:00', '2024-12-01'),
('10:00:00', '11:00:00', '2024-12-01'),
('11:00:00', '12:00:00', '2024-12-01'),
('13:00:00', '14:00:00', '2024-12-01');


-- Populating Package table
INSERT INTO Package (Name, Time_Since_Purchase)
VALUES
('Basic Wash', 1),
('Premium Wash', 3),
('Interior Detailing', 2),
('Full Detailing', 6),
('Paint Protection', 12);


-- Populating Task table
INSERT INTO Task (Name, Estd_Time, Estd_Labor_Cost)
VALUES
('Wash Exterior', 1, 15.00),
('Vacuum Interior', 2, 30.00),
('Polish Exterior', 3, 50.00),
('Wax Exterior', 2, 40.00),
('Apply Ceramic Coating', 4, 100.00);


-- Populating Part table
INSERT INTO Part (Cost_Of_Part, Name)
VALUES
(10.00, 'Wax'),
(20.00, 'Polish'),
(50.00, 'Ceramic Coating Kit'),
(5.00, 'Vacuum Bag'),
(15.00, 'Glass Cleaner');


-- Populating Owns table
INSERT INTO Owns (Customer_ID, Car_ID)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);


-- Populating Purchase table
INSERT INTO Purchase (Date_Of_Purchase, Sale_Price, Car_ID)
VALUES
('2024-11-01', 25000.00, 1),
('2024-11-02', 22000.00, 2),
('2024-11-03', 27000.00, 3),
('2024-11-04', 32000.00, 4),
('2024-11-05', 20000.00, 5);


-- Populating Appointment table
INSERT INTO Appointment (Drop_Off, Pick_Up, Appointment_Made_Date, Car_ID, Package_ID, Time_Slot_ID, Customer_ID)
VALUES
('2024-12-01 08:00:00', '2024-12-01 09:00:00', '2024-11-30 10:00:00', 1, 1, 1, 1),
('2024-12-01 09:00:00', '2024-12-01 10:00:00', '2024-11-30 10:30:00', 2, 2, 2, 2),
('2024-12-01 10:00:00', '2024-12-01 11:00:00', '2024-11-30 11:00:00', 3, 3, 3, 3),
('2024-12-01 11:00:00', '2024-12-01 12:00:00', '2024-11-30 11:30:00', 4, 4, 4, 4),
('2024-12-01 13:00:00', '2024-12-01 14:00:00', '2024-11-30 12:00:00', 5, 5, 5, 5);


-- (Similarly, populate Additionally_Scheduled, Was_Performed, Was_Replaced, Recommends, and Failure_Requires)

INSERT INTO Additionally_Scheduled (Appointment_ID, Task_ID)
VALUES
(1, 2),    -- Task 2 additionally scheduled for Appointment 1
(2, 3),    -- Task 3 additionally scheduled for Appointment 2
(3, 1),    -- Task 1 additionally scheduled for Appointment 3
(4, 4),    -- Task 4 additionally scheduled for Appointment 4
(5, 5);    -- Task 5 additionally scheduled for Appointment 5

INSERT INTO Was_Performed (Appointment_ID, Task_ID, Labor_Cost, Time)
VALUES
(1, 1, 50.00, 60),  -- Task 1 performed in Appointment 1
(2, 2, 30.00, 45),  -- Task 2 performed in Appointment 2
(3, 3, 70.00, 90),  -- Task 3 performed in Appointment 3
(4, 4, 40.00, 60),  -- Task 4 performed in Appointment 4
(5, 5, 100.00, 120);-- Task 5 performed in Appointment 5

INSERT INTO Was_Replaced (Appointment_ID, Part_ID)
VALUES
(1, 1),    -- Part 1 replaced during Appointment 1
(2, 2),    -- Part 2 replaced during Appointment 2
(3, 3),    -- Part 3 replaced during Appointment 3
(4, 4),    -- Part 4 replaced during Appointment 4
(5, 5);    -- Part 5 replaced during Appointment 5

INSERT INTO Recommends (Package_ID, Task_ID, Is_Mandatory)
VALUES
(1, 1, TRUE),    -- Task 1 is mandatory for Package 1
(2, 2, TRUE),    -- Task 2 is mandatory for Package 2
(3, 3, FALSE),   -- Task 3 is optional for Package 3
(4, 4, TRUE),    -- Task 4 is mandatory for Package 4
(5, 5, FALSE);   -- Task 5 is optional for Package 5

INSERT INTO Failure_Requires (Task_ID, Part_ID)
VALUES
(1, 1),    -- Task 1 requires Part 1
(2, 2),    -- Task 2 requires Part 2
(3, 3),    -- Task 3 requires Part 3
(4, 4),    -- Task 4 requires Part 4
(5, 5);    -- Task 5 requires Part 5
