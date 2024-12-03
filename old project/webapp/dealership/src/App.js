import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CarList from "./components/CarList";
import CarDetails from "./components/CarDetails";
import AddCarForm from "./components/AddCarForm";
import AddCustomerForm from "./components/AddCustomerForm";
import CarListPage from "./components/CarListPage";
import CustomerListPage from "./components/CustomerListPage";
import AddServiceAppointmentForm from "./components/AddServiceAppointmentForm";
import ServiceAppointmentListPage from "./components/ServiceAppointmentListPage"; // Import the new component
import axios from "axios";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [serviceAppointments, setServiceAppointments] = useState([]); // State for appointments
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cars").then((response) => setCars(response.data));
    axios.get("http://localhost:5000/api/customers").then((response) => setCustomers(response.data));
    axios.get("http://localhost:5000/api/appointments").then((response) => setServiceAppointments(response.data));
  }, []);

  const addCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const addServiceAppointment = (appointment) => {
    setServiceAppointments([...serviceAppointments, appointment]);
  };

  const selectCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <Router>
      <div>
        <h1>Car CRM</h1>
        <nav>
          <Link to="/add-car" className="nav-link">Add Car</Link>
          <Link to="/add-customer" className="nav-link">Add Customer</Link>
          <Link to="/cars" className="nav-link">View Cars</Link>
          <Link to="/customers" className="nav-link">View Customers</Link>
          <Link to="/add-service-appointment" className="nav-link">Add Service Appointment</Link>
          <Link to="/service-appointments" className="nav-link">View Service Appointments</Link> {/* New link */}
        </nav>

        <div className="container">
          <Routes>
            <Route path="/add-car" element={<AddCarForm addCar={addCar} />} />
            <Route path="/add-customer" element={<AddCustomerForm addCustomer={addCustomer} />} />
            <Route path="/cars" element={<CarListPage cars={cars} selectCar={selectCar} />} />
            <Route path="/customers" element={<CustomerListPage customers={customers} />} />
            <Route path="/add-service-appointment" element={<AddServiceAppointmentForm cars={cars} addServiceAppointment={addServiceAppointment} />} />
            <Route path="/service-appointments" element={<ServiceAppointmentListPage serviceAppointments={serviceAppointments} cars={cars} />} /> {/* New route */}
            <Route
              path="/"
              element={
                <>
                  <CarList cars={cars} selectCar={selectCar} />
                  {selectedCar && <CarDetails car={selectedCar} />}
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
