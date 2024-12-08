import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchServiceBill } from '../../api';
import '../../styling/ServiceBill.css';

const ServiceBill = () => {
    const { appointmentId } = useParams();
    const [bill, setBill] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchServiceBill(appointmentId)
            .then((response) => setBill(response.data))
            .catch((err) => {
                console.error('Error fetching service bill:', err);
                setError('Failed to fetch the service bill.');
            });
    }, [appointmentId]);

    if (error) {
        return <p className="error-text">{error}</p>;
    }

    if (!bill) {
        return <p className="loading-text">Loading bill details...</p>;
    }

    return (
        <div className="service-bill-container">
            <h1 className="title">Service Bill</h1>
            <h2 className="subtitle">Appointment ID: {appointmentId}</h2>
            <h3 className="section-title">Tasks Performed</h3>
            <ul className="bill-list">
                {bill.tasks.map((task) => (
                    <li key={task.Task_ID} className="bill-item">
                        <strong>{task.Task_Name}</strong> - Labor Cost: ${Number(task.Labor_Cost).toFixed(2)}, Time: {task.Time} minutes
                    </li>
                ))}
            </ul>
            <h3 className="section-title">Parts Used</h3>
            <ul className="bill-list">
                {bill.parts.map((part) => (
                    <li key={part.Part_ID} className="bill-item">
                        <strong>{part.Part_Name}</strong> - Cost: ${Number(part.Cost_Of_Part).toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3 className="section-title">Totals</h3>
            <div className="totals">
                <p><strong>Total Labor Cost:</strong> ${Number(bill.totalLaborCost).toFixed(2)}</p>
                <p><strong>Total Part Cost:</strong> ${Number(bill.totalPartCost).toFixed(2)}</p>
                <p><strong>Total Cost:</strong> ${Number(bill.totalCost).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ServiceBill;
