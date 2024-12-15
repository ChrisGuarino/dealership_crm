// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { useParams } from 'react-router-dom'; // Hook to retrieve route parameters
import { fetchServiceBill } from '../../api'; // API function to fetch service bill details
import '../../styling/ServiceBill.css'; // Import the CSS file for styling

// ServiceBill component definition
const ServiceBill = () => {
    // Extract the appointmentId from the route parameters
    const { appointmentId } = useParams();

    // State to store fetched service bill details
    const [bill, setBill] = useState(null);
    // State to handle error messages
    const [error, setError] = useState('');

    // useEffect to fetch service bill details when the component mounts or appointmentId changes
    useEffect(() => {
        fetchServiceBill(appointmentId)
            .then((response) => setBill(response.data)) // Update state with fetched data
            .catch((err) => {
                console.error('Error fetching service bill:', err); // Log error
                setError('Failed to fetch the service bill.'); // Set an error message
            });
    }, [appointmentId]); // Dependency array ensures effect runs when appointmentId changes

    // If there is an error, display the error message
    if (error) {
        return <p className="error-text">{error}</p>;
    }

    // If service bill details are not yet loaded, display a loading message
    if (!bill) {
        return <p className="loading-text">Loading bill details...</p>;
    }

    // Render the service bill details
    return (
        <div className="service-bill-container">
            <h1 className="title">Service Bill</h1>
            <h2 className="subtitle">Appointment ID: {appointmentId}</h2>

            {/* Render the tasks performed */}
            <h3 className="section-title">Tasks Performed</h3>
            <ul className="bill-list">
                {bill.tasks.map((task) => (
                    <li key={task.Task_ID} className="bill-item">
                        <strong>{task.Task_Name}</strong> - Labor Cost: ${Number(task.Labor_Cost).toFixed(2)}, Time: {task.Time} minutes
                    </li>
                ))}
            </ul>

            {/* Render the parts used */}
            <h3 className="section-title">Parts Used</h3>
            <ul className="bill-list">
                {bill.parts.map((part) => (
                    <li key={part.Part_ID} className="bill-item">
                        <strong>{part.Part_Name}</strong> - Cost: ${Number(part.Cost_Of_Part).toFixed(2)}
                    </li>
                ))}
            </ul>

            {/* Render the totals */}
            <h3 className="section-title">Totals</h3>
            <div className="totals">
                <p><strong>Total Labor Cost:</strong> ${Number(bill.totalLaborCost).toFixed(2)}</p>
                <p><strong>Total Part Cost:</strong> ${Number(bill.totalPartCost).toFixed(2)}</p>
                <p><strong>Total Cost:</strong> ${Number(bill.totalCost).toFixed(2)}</p>
            </div>
        </div>
    );
};

// Export the ServiceBill component as the default export
export default ServiceBill;
