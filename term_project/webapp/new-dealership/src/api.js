// Import Axios library for making HTTP requests
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: 'http://localhost:5001/api', // Replace with your backend's URL
});

// Service-related API calls
// GET calls
export const fetchAppointments = () => api.get('/service/appointments');
export const fetchAppointmentDetails = (id) => api.get(`/service/appointments/${id}`);
export const fetchCustomerAppointments = (customerID) => api.get(`/service/appointments/customer/${customerID}`);
export const fetchPackages = () => api.get('/service/packages');
export const fetchParts = () => api.get('/service/parts');
export const fetchTotalCustomerCharge = (customerID) => api.get(`/service/appointments/customer/${customerID}/total`);
export const fetchPackageDetails = (packageId) => api.get(`/service/packages/${packageId}/details`);
export const fetchPartsForTask = (taskId) => api.get(`/service/tasks/${taskId}/parts`);
export const fetchServiceBill = (appointmentId) => api.get(`/service/bill/${appointmentId}`);
export const fetchTasksForAppointment = (appointmentId) => api.get(`/service/appointments/${appointmentId}/tasks`);
export const fetchTasksInPackage = (packageID) => api.get(`/service/packages/${packageID}/tasks`);
export const fetchPartsInPackage = (packageID) => api.get(`/service/packages/${packageID}/parts`);
export const fetchAdditionalServices = () => api.get('/service/scheduled-services');
export const fetchTasks = () => api.get('/service/tasks');

// POST calls
export const createAppointment = (data) => api.post('/service/appointments', data);
export const logWasPerformed = (data) => api.post('/service/was_performed', data);
export const logWasReplaced = (data) => api.post('/service/was_replaced', data);

// Vehicle-related API calls
// GET calls
export const fetchVehiclesInInventory = () => api.get('/vehicles/inventory');
export const fetchCustomerVehicles = () => api.get('/vehicles/owned');
export const fetchPurchases = () => api.get('/vehicles/purchases');
export const fetchCustomerPurchases = (customerID) => api.get(`/vehicles/purchases/customer/${customerID}`);
export const fetchTotalCustomerPurchases = (customerID) => api.get(`/vehicles/purchases/customer/${customerID}/total`);
export const fetchVehicleDetails = (carId) => api.get(`/vehicles/${carId}/details`);

// POST calls
export const addVehicleToInventory = (data) => api.post('/vehicles/inventory', data);
export const assignVehicleToCustomer = (data) => api.post('/vehicles/inventory/purchase', data);

// Customer-related API calls
// GET calls
export const fetchCustomers = () => api.get('/customers');
export const fetchCustomerDetails = (id) => api.get(`/customers/${id}`);
export const fetchTotalCustomerSpend = (customerID) => api.get(`/customers/${customerID}/total-spent`);

// POST calls
export const createCustomer = (data) => api.post('/customers', data);

// Sales-related API calls
export const fetchSalesStatistics = (startDate, endDate) => api.get('/sales/stats', { params: { startDate, endDate } });
export const fetchPurchasedVehicles = (startDate, endDate) => api.get('/sales/purchases');
export const fetchPurchaseDetails = (purchaseId) => api.get(`/sales/purchase/${purchaseId}/bill`);

// Export the Axios instance for custom calls if needed
export default api;
