import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Customer Management
import CustomersHome from './components/Customers/CustomersHome';
import CustomersList from './components/Customers/CustomersList';
import AddCustomer from './components/Customers/AddCustomer';
import DeleteCustomer from './components/Customers/DeleteCustomer';
import CustomerDetails from './components/Customers/CustomerDetails';

// Vehicle Management
import VehiclesHome from './components/Vehicles/VehiclesHome';
import Inventory from './components/Vehicles/Inventory';
import CustomerVehicles from './components/Vehicles/CustomerVehicles';
import AddVehicle from './components/Vehicles/AddVehicle';
import DeleteVehicle from './components/Vehicles/DeleteVehicle';

// Service Department
import ServiceHome from './components/Service/ServiceHome';
import Appointments from './components/Service/Appointments';
import Packages from './components/Service/Packages';
import Parts from './components/Service/Parts';
import AddAppointment from './components/Service/AddAppointment';
import DeleteAppointment from './components/Service/DeleteAppointment';
import PackageDetails from './components/Service/PackageDetails';
import AssignVehicle from './components/Vehicles/AssignVehicle';
import VehicleDetails from './components/Vehicles/VehicleDetails';

//Sales Management
import SalesHome from './components/Sales/SalesHome';
import SalesStats from './components/Sales/SalesStats';
import Purchases from './components/Sales/PurchasedVehicles';


const App = () => {
    return (
        <Router>
            <div>
                {/* Main Navigation */}
                <nav>
                    <h1>Dealership Management</h1>
                    <ul>
                        <li><Link to="/customers">Customer Management</Link></li>
                        <li><Link to="/vehicles">Vehicle Management</Link></li>
                        <li><Link to="/service">Service Department</Link></li>
                        <li><Link to="/sales">Sales Management</Link></li>
                    </ul>
                </nav>

                {/* Application Routes */}
                <Routes>
                    {/* Customer Management */}
                    <Route path="/customers" element={<CustomersHome />} />
                    <Route path="/customers/list" element={<CustomersList />} />
                    <Route path="/customers/:customerId/details" element={<CustomerDetails />} />
                    <Route path="/customers/add" element={<AddCustomer />} />
                    <Route path="/customers/delete" element={<DeleteCustomer />} />
                    

                    {/* Vehicle Management */}
                    <Route path="/vehicles" element={<VehiclesHome />} />
                    <Route path="/vehicles/inventory" element={<Inventory />} />
                    <Route path="/vehicles/owned" element={<CustomerVehicles />} />
                    <Route path="/vehicles/add" element={<AddVehicle />} />
                    <Route path="/vehicles/delete" element={<DeleteVehicle />} />
                    <Route path="/vehicles/purchase" element={<AssignVehicle />} />
                    <Route path="/vehicles/:carId/details" element={<VehicleDetails />} />
                    

                    {/* Service Department */}
                    <Route path="/service" element={<ServiceHome />} />
                    <Route path="/service/appointments" element={<Appointments />} />
                    <Route path="/service/add-appointment" element={<AddAppointment />} />
                    <Route path="/service/delete-appointment" element={<DeleteAppointment />} />
                    <Route path="/service/packages" element={<Packages />} />
                    <Route path="/service/parts" element={<Parts />} />
                    <Route path="/service/packages/:packageId/details" element={<PackageDetails />} />

                    {/* Sales Management */}
                    <Route path="/sales" element={<SalesHome />} />
                    <Route path="/sales/stats" element={<SalesStats />} />
                    <Route path="/sales/purchases" element={<Purchases />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
